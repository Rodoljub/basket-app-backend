import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { CreateMovementInput } from './movement.types';

import { SimplifiedInteractionInput } from './movement.dto';

export const handleSimplifiedInteraction = async (input: SimplifiedInteractionInput) => {
  const { placeId, routeId, driverId, basketType, delta } = input;

  if (delta === 0) throw new Error('Delta must not be zero');

  // Get the store
  const store = await prisma.place.findUnique({
    where: { id: placeId },
  });
  if (!store) throw new Error('Store not found');
  console.log('store', store)
  // Get the van from the route
  const route = await prisma.route.findUnique({
    where: { id: routeId },
    include: {
      driver: {
      include: {
        van: true,  // <-- this works because van is a relation to Place
      },
    },
    routeStores: {
      include: { place: true },
    },
    },
  });
  console.log('route driver id', route?.driver?.vanId)
  if (!route?.driver?.vanId) throw new Error('Van not found for route');

  const vanId = route.driver.vanId;

  const fromPlaceId = delta > 0 ? vanId : placeId;
  const toPlaceId = delta > 0 ? placeId : vanId;
  const quantity = Math.abs(delta);

  console.log('fromPlaceId', fromPlaceId)
  console.log('toPlaceId', toPlaceId)
  console.log('placeId', placeId)
  // Create Movement
  const movement = await prisma.movement.create({
    data: {
      fromPlaceId,
      toPlaceId,
      driverId,
      quantity,
      basketType,
    },
  });

  // Update Inventory at target place (placeId)
  const inventory = await prisma.inventory.upsert({
    where: {
      placeId_basketType: {
        placeId: placeId,
        basketType,
      },
    },
    update: {
      quantity: {
        increment: delta,
      },
    },
    create: {
      placeId: placeId,
      basketType,
      quantity: delta,
    },
  });

  const vanInventory = await prisma.inventory.upsert({
  where: {
    placeId_basketType: {
      placeId: vanId,
      basketType,
    },
  },
  update: {
    quantity: {
      increment: -delta,
    },
  },
  create: {
    placeId: vanId,
    basketType,
    quantity: -delta,
  },
});

  return { movement, inventory, vanInventory };
};

export const createMovement = async (data: CreateMovementInput) => {
  const { fromPlaceId, toPlaceId, driverId, quantity, basketType } = data;

  const movement = await prisma.movement.create({
    data: {
      fromPlaceId,
      toPlaceId,
      driverId,
      quantity,
      basketType
    },
  });

  if (fromPlaceId) {
    await adjustInventory(fromPlaceId, quantity * -1);
  }
  if (toPlaceId) {
    await adjustInventory(toPlaceId, quantity);
  }

  return movement;
};

const adjustInventory = async (placeId: number, delta: number) => {
  // Apply for each BasketType
  const basketTypes = ['BIG', 'SMALL'] as const;
  for (const basketType of basketTypes) {
    await prisma.inventory.upsert({
      where: {
        placeId_basketType: {
          placeId,
          basketType,
        },
      },
      update: {
        quantity: {
          increment: delta,
        },
      },
      create: {
        placeId,
        basketType,
        quantity: Math.max(0, delta),
      },
    });
  }
};

export const getAllMovements = () => prisma.movement.findMany();

export const getMovementById = (id: number) =>
  prisma.movement.findUnique({ where: { id } 
  });

export const deleteMovement = async (id: number) => {
  const movement = await prisma.movement.delete({ where: { id } });

  const delta = movement.quantity;
  if (movement.fromPlaceId) {
    await adjustInventory(movement.fromPlaceId, delta);
  }
  if (movement.toPlaceId) {
    await adjustInventory(movement.toPlaceId, delta * -1);
  }

  return movement;
};

type Filters = {
  placeId?: string;
  dateFrom?: string;
  dateTo?: string;
};

export const getMovementsFiltered = async ({ placeId, dateFrom, dateTo }: Filters) => {
  const where: any = {};

  if (placeId) {
    where.OR = [{ fromPlaceId: placeId }, { toPlaceId: placeId }];
  }

  if (dateFrom || dateTo) {
    where.createdAt = {};
    if (dateFrom) where.createdAt.gte = new Date(dateFrom);
    if (dateTo) where.createdAt.lte = new Date(dateTo);
  }

  return await prisma.movement.findMany({
    where,
    orderBy: { timestamp: 'desc' },
    include: {
      fromPlace: true,
      toPlace: true,
      driver: true,
    },
  });
};
