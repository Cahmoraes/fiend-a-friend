import ExtendedSet from '@cahmoraes93/extended-set'
import { PetsRepository } from '@/domain/repositories/pets-repository'
import { Pet } from '@/domain/enterprise/entities/pet'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

export class InMemoryPetsRepository implements PetsRepository {
  public items = new ExtendedSet<Pet>()

  async create(aPet: Pet): Promise<Pet> {
    if (!this.items.has(aPet)) {
      this.items.add(aPet)
    }
    return aPet
  }

  async findManyByOrgIds(orgIds: UniqueEntityId[]): Promise<Pet[]> {
    return this.items
      .filter((pet) => orgIds.some((orgId) => orgId.equals(pet.orgId)))
      .toArray()
  }
}
