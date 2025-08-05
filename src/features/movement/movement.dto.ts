// movement.dto.ts

export type SimplifiedInteractionInput = {
  placeId: number;
  routeId: number;
  driverId: number;
  basketType: 'BIG' | 'SMALL';
  delta: number; // positive = added (left), negative = taken
};
