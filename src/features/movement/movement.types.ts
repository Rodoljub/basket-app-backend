// src/features/movement/movement.types.ts

import { BasketType } from "@prisma/client";

export type CreateMovementInput = {
  fromPlaceId: number | null;
  toPlaceId: number | null;
  driverId: number ;
  quantity: number;
  basketType: BasketType;
};
