import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const DriverService = {
    getAllDrivers: async () => {
  return prisma.driver.findMany({
    orderBy: { name: 'asc' },
  });
},

    getDriverById: async (id: number) => {
  return prisma.driver.findUnique({
    where: { id },
  });
},

createDriver: async (name: string) => {
  return prisma.driver.create({
    data: { name },
  });
},

    updateDriver: async (id: number, name: string) => {
  try {
    return await prisma.driver.update({
      where: { id },
      data: { name },
    });
  } catch {
    return null;
  }
},

    deleteDriver: async (id: number) => {
  try {
    await prisma.driver.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
}

