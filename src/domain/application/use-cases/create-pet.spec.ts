import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { makeOrg } from 'tests/factories/make-org'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'

describe('Create Pet Use Case', () => {
  it('should create a Pet', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new CreatePetUseCase(petsRepository)

    const org = makeOrg()
    new InMemoryOrgsRepository().create(org)

    const { pet } = await sut.execute({
      age: 7,
      description: 'fofinho',
      name: 'Bolt',
      orgId: org.id.value,
      size: 'medium',
    })

    expect(pet).toBeDefined()
    expect(petsRepository.items.size).toBe(1)
    expect(petsRepository.items.toArray()[0].orgId.value).toBe(org.id.value)
  })
})
