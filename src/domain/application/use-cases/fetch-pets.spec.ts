import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pets-repository'
import { makeOrg } from 'tests/factories/make-org'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'
import { makePet } from 'tests/factories/make-pet'
import { FetchPetsUseCase } from './fetch-pets'

describe('Fetch Pet Use Case', () => {
  it('should create a Pet', async () => {
    const petsRepository = new InMemoryPetsRepository()
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new FetchPetsUseCase(orgsRepository, petsRepository)

    const org = makeOrg()
    await orgsRepository.create(org)

    const pet = makePet({
      orgId: org.id,
    })

    await petsRepository.create(pet)

    const { pets } = await sut.execute({
      city: 'Osasco',
    })

    expect(pets).toBeDefined()
    expect(petsRepository.items.size).toBe(1)
    expect(orgsRepository.items.size).toBe(1)
    expect(petsRepository.items.toArray()[0].orgId.value).toBe(org.id.value)
    expect(pets).toMatchObject([
      expect.objectContaining({
        name: pet.name,
        id: pet.id,
      }),
    ])
  })
})
