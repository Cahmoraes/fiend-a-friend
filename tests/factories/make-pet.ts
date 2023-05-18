import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Pet, PetProps } from '@/domain/enterprise/entities/pet'

export function makePet(overrides?: Partial<PetProps>, id?: UniqueEntityId) {
  return Pet.create(
    {
      name: 'Bolt',
      age: 7,
      description: 'fofinho',
      orgId: new UniqueEntityId(),
      size: 'small',
      ...overrides,
    },
    id,
  )
}
