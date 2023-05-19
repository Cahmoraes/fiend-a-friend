import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { makeOrg } from 'tests/factories/make-org'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'

describe('Create Pet Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: CreatePetUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should create a Pet', async () => {
    const org = makeOrg()
    await orgsRepository.create(org)

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
