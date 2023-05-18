import ExtendedSet from '@cahmoraes93/extended-set'
import {
  FindManyParams,
  PetsRepository,
} from '@/domain/repositories/pets-repository'
import { Pet } from '@/domain/enterprise/entities/pet'

export class InMemoryPetsRepository implements PetsRepository {
  public items = new ExtendedSet<Pet>()

  async findManyByOrgIds(
    orgIds: string[],
    params: FindManyParams,
  ): Promise<Pet[]> {
    return this.items
      .filter((pet) => orgIds.includes(pet.orgId.value))
      .filter((pet) => pet.size === params.size)
      .toArray()
  }

  async create(aPet: Pet): Promise<Pet> {
    if (!this.items.has(aPet)) {
      this.items.add(aPet)
    }
    return aPet
  }
}
