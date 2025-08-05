import { PrismaClient, BasketType } from '@prisma/client';

const prisma = new PrismaClient();

export const InventoryService = {
  getAll: async () => {
    return prisma.inventory.findMany({
      include: { place: true },
    });
  },

  getById: async (id: number) => {
    return prisma.inventory.findUnique({ where: { id } });
  },

  create: async (data: { placeId: number; basketType: BasketType; quantity: number }) => {
    return prisma.inventory.create({ data });
  },

  update: async (id: number, data: { quantity: number }) => {
    return prisma.inventory.update({ where: { id }, data });
  },

  delete: async (id: number) => {
    return prisma.inventory.delete({ where: { id } });
  },

  getInventoryByPlaceId: async (placeId: string) => {
  return await prisma.inventory.findMany({
    where: { placeId:  Number(placeId) },
    select: {
      basketType: true,
      quantity: true,
    },
  });
}
};
