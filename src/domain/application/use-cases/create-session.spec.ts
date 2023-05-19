import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'
import { CreateSessionUseCase } from './create-session'
import { makeOrg } from 'tests/factories/make-org'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentails-error'

describe('Create Session Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: CreateSessionUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateSessionUseCase(orgsRepository)
  })

  it('should create a session', async () => {
    const user_password = 'any_password'

    const createdOrg = makeOrg({
      email: 'email@org.com',
      password: await hash('any_password', 6),
    })

    await orgsRepository.create(createdOrg)

    const { org } = await sut.execute({
      email: createdOrg.email,
      password: user_password,
    })

    expect(org).toEqual(createdOrg)
    expect(orgsRepository.items.size).toBe(1)
  })

  it('should not create session with invalid email', async () => {
    const user_password = 'any_password'

    const createdOrg = makeOrg({
      email: 'email@org.com',
      password: await hash('any_password', 6),
    })

    await orgsRepository.create(createdOrg)

    await expect(() =>
      sut.execute({
        email: 'wrong email',
        password: user_password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not create session with invalid password', async () => {
    const createdOrg = makeOrg({
      email: 'email@org.com',
      password: await hash('any_password', 6),
    })

    await orgsRepository.create(createdOrg)

    await expect(() =>
      sut.execute({
        email: 'email@org.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
