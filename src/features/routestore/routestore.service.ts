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

export const create = async (data: { routeId: number; placeId: number; order: number }) => {
  return prisma.routeStore.create({ data });
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
  try {
    await prisma.routeStore.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
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

