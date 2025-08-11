// src/features/place/place.service.ts
import { Place, PlaceType, PrismaClient } from '@prisma/client';
import { CreatePlaceDto } from './place.types';

const prisma = new PrismaClient();

export const placeService = {
  async getAll() {
    return prisma.place.findMany();
  },

  async getWarehousesAndStores(): Promise<Place[]> {
    return prisma.place.findMany({
      where: {
        type: {
          in: [PlaceType.WAREHOUSE, PlaceType.STORE],
        },
      },
    });
  },

  async getById(id: number) {
    return prisma.place.findUnique({ where: { id } });
  },

  async getByType(placeType: PlaceType) {
    console.log('type');
    return prisma.place.findMany({
      where: { type: placeType as PlaceType }
    })
  },

  async create(data: CreatePlaceDto) {
    return prisma.place.create({ data });
  },

  async update(id: number, data: Partial<CreatePlaceDto>) {
    return prisma.place.update({ where: { id }, data });
  },

  // async delete(id: number) {
  //   return prisma.place.delete({ where: { id } });
  // }

  async delete(id: number) {
  await prisma.inventory.deleteMany({
    where: { placeId: id },
  });

  return prisma.place.delete({
    where: { id },
  });
}

};




