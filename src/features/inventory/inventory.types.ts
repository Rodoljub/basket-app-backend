import { BasketType } from '@prisma/client';


export interface CreateInventoryDto {
  placeId: number;
  basketType: BasketType;
  quantity: number;
}

export interface UpdateInventoryDto {
  quantity: number;
}
