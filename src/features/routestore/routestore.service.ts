import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const getAll = async () => {
  return prisma.routeStore.findMany({
    include: {
      route: true,
      place: true,
    },
    orderBy: { order: 'asc' },
  });
};

export const getById = async (id: number) => {
  return prisma.routeStore.findUnique({
    where: { id },
    include: {
      route: true,
      place: true,
    },
  });
};

export const create = async (dto: {
  routeId: number;
  placeId: number;
}) => {
  // Get the current highest order for this route
  const maxOrder = await prisma.routeStore.aggregate({
    where: { routeId: dto.routeId },
    _max: { order: true },
  });

  const nextOrder = (maxOrder._max.order || 0) + 1;

  return prisma.routeStore.create({
    data: {
      routeId: dto.routeId,
      placeId: dto.placeId,
      order: nextOrder,
    },
  });
};

export const update = async (
  id: number,
  data: { routeId: number; placeId: number; order: number }
) => {
  try {
    return await prisma.routeStore.update({
      where: { id },
      data,
    });
  } catch {
    return null;
  }
};

export const remove = async (id: number) => {
  const existing = await prisma.routeStore.findUnique({ where: { id } });

  if (!existing) throw new Error('RouteStore not found');

  const { routeId, order: deletedOrder } = existing;

  // Delete the entry
  await prisma.routeStore.delete({ where: { id } });

  // Shift down all orders above the deleted one
  await prisma.routeStore.updateMany({
    where: {
      routeId,
      order: { gt: deletedOrder },
    },
    data: {
      order: { decrement: 1 },
    },
  });

  return { success: true };
};

export const getByRouteId = async (routeId: number) => {
  return prisma.routeStore.findMany({
    where: { routeId },
    include: { place: true },
    orderBy: { order: 'asc' },
  });
};

export const bulkReorder = async (
  updates: { id: number; order: number }[]
) => {
  const transactions = updates.map(update =>
    prisma.routeStore.update({
      where: { id: update.id },
      data: { order: update.order },
    })
  );

  return prisma.$transaction(transactions);
};

export const insertAtOrder = async (dto: {
  routeId: number;
  placeId: number;
  order: number;
}) => {
  const { routeId, placeId, order } = dto;

  // Count how many stores are currently in the route
  const count = await prisma.routeStore.count({ where: { routeId } });

  if (order < 1 || order > count + 1) {
    throw new Error(`Invalid order. Must be between 1 and ${count + 1}`);
  }

  // Shift existing stores at or after desired order
  await prisma.routeStore.updateMany({
    where: {
      routeId,
      order: { gte: order },
    },
    data: {
      order: { increment: 1 },
    },
  });

  // Insert the new store at desired order
  return prisma.routeStore.create({
    data: {
      routeId,
      placeId,
      order,
    },
  });
};

export const moveToOrder = async (dto: {
  id: number;
  newOrder: number;
}) => {
  const { id, newOrder } = dto;

  const current = await prisma.routeStore.findUnique({ where: { id } });
  if (!current) throw new Error('RouteStore not found');

  const { routeId, order: currentOrder } = current;

  if (newOrder < 1)
    throw new Error(`newOrder must be >= 1`);

  const count = await prisma.routeStore.count({ where: { routeId } });

  if (newOrder > count)
    throw new Error(`newOrder cannot exceed ${count}`);

  if (newOrder === currentOrder) return current;

  // Move up (e.g., 5 → 2): shift 2-4 up
  if (newOrder < currentOrder) {
    await prisma.routeStore.updateMany({
      where: {
        routeId,
        order: {
          gte: newOrder,
          lt: currentOrder,
        },
      },
      data: { order: { increment: 1 } },
    });
  }
  // Move down (e.g., 2 → 5): shift 3-5 down
  else {
    await prisma.routeStore.updateMany({
      where: {
        routeId,
        order: {
          gt: currentOrder,
          lte: newOrder,
        },
      },
      data: { order: { decrement: 1 } },
    });
  }

  return prisma.routeStore.update({
    where: { id },
    data: { order: newOrder },
  });
};

export const getOrderedRouteStores = async (routeId: number) => {
  return prisma.routeStore.findMany({
    where: { routeId },
    orderBy: { order: 'asc' },
    include: {
      place: true, // include full place details
    },
  });
};




