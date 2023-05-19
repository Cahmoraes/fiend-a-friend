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
    const filters = Object.entries(params).filter(this.filterParams)

    return this.items
      .filter((pet) => orgIds.includes(pet.orgId.value))
      .filter((pet) => filters.every(([key, value]) => pet[key] === value))
      .toArray()
  }

  private filterParams(
    filterEntry: [string, any],
  ): filterEntry is [keyof Pet, any] {
    const [, value] = filterEntry
    return value !== undefined
  }

  async create(aPet: Pet): Promise<Pet> {
    if (!this.items.has(aPet)) {
      this.items.add(aPet)
    }
    return aPet
  }
}
