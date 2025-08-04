// src/features/place/place.types.ts
export type PlaceType = 'WAREHOUSE' | 'STORE' | 'VAN';

export interface CreatePlaceDto {
  name: string;
  type: PlaceType;
}
