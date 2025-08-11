import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const RouteService = {
getAllRoutes: async () => {
  return prisma.route.findMany({
    include: {
      driver: true,
      routeStores: {
        include: { place: true },
      },
    },
    orderBy: { id: 'asc' },
  });
},

getRouteById: async (id: number) => {
  return prisma.route.findUnique({
    where: { id },
    include: {
      driver: true,
      routeStores: {
        include: { place: true },
      },
    },
  });
},

createRoute: async (name: string) => {
  return prisma.route.create({
    data: {
      name
    },
  });
},

updateRoute: async (id: number, name?: string, driverId?: number) => {
  try {
    return await prisma.route.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(driverId !== undefined && { driverId }),
      },
    });
  } catch {
    return null;
  }
},

patchRoute: async (id: number, data: { name?: string; driverId?: number }) => {
  try {
    return await prisma.route.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.driverId !== undefined && { driverId: data.driverId }),
      },
    });
  } catch {
    return null;
  }
},

// updateRoute: async (id: number, name: string, driverId: number) => {
//   try {
//     return await prisma.route.update({
//       where: { id },
//       data: {
//         name,
//         driverId,
//       },
//     });
//   } catch {
//     return null;
//   }
// },

deleteRoute: async (id: number) => {
  try {
    await prisma.route.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

}
