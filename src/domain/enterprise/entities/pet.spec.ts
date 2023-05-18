import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Pet } from './pet'

describe('Pet', () => {
  it('should be able to create a Pet', () => {
    const pet = Pet.create({
      age: 1,
      description: 'Cachorro fofo',
      name: 'Bolt',
      orgId: new UniqueEntityId(),
      size: 'medium',
    })

    expect(pet).toBeInstanceOf(Pet)
    expect(pet.name).toBe('Bolt')
    expect(pet.orgId).toBeInstanceOf(UniqueEntityId)
  })
})
