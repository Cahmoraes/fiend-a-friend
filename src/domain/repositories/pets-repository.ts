import { Pet, Size } from '../enterprise/entities/pet'

export interface FindManyParams extends Partial<Pet> {
  size?: Size
}

export interface PetsRepository {
  create(aPet: Pet): Promise<Pet>
  findManyByOrgIds(orgIds: string[], params: FindManyParams): Promise<Pet[]>
}
