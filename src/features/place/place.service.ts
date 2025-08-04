// src/features/place/place.service.ts
import { PrismaClient } from '@prisma/client';
import { CreatePlaceDto } from './place.types';

const prisma = new PrismaClient();

export const placeService = {
  async getAll() {
    return prisma.place.findMany();
  },

  async getById(id: number) {
    return prisma.place.findUnique({ where: { id } });
  },

  async create(data: CreatePlaceDto) {
    return prisma.place.create({ data });
  },

  async update(id: number, data: Partial<CreatePlaceDto>) {
    return prisma.place.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.place.delete({ where: { id } });
  }
};




