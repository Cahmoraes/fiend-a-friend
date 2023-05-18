import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'
import { CreateOrgUseCase } from './create-org'

describe('Create Org Use Case', () => {
  it('should create an Org', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const sut = new CreateOrgUseCase(orgsRepository)

    const { org } = await sut.execute({
      city: 'Osasco',
      email: 'osasco@mail.com',
      password: '123456',
      phone: '11578954569',
    })

    expect(org).toBeDefined()
    expect(orgsRepository.items.size).toBe(1)
  })
})
