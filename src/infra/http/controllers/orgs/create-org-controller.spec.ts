import { CreateOrgUseCase } from '@/domain/application/use-cases/create-org'
import { CreateOrgController } from './create-org-controller'
import { makeOrg } from 'tests/factories/make-org'

describe('Create Org Controller', () => {
  const sut = new CreateOrgController()
  const createOrUseCaseSpy = vi
    .spyOn(CreateOrgUseCase.prototype, 'execute')
    .mockResolvedValueOnce({ org: makeOrg() })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should create an Org', async () => {
    const request: any = {
      body: {
        email: 'email@org.com',
        password: 'any_password',
        phone: '123456',
        city: 'Osasco',
      },
    }

    const reply: any = {
      send: vi.fn(),
    }

    await sut.intercept(request, reply)

    expect(reply.send).toBeCalledTimes(1)
    expect(createOrUseCaseSpy).toBeCalledTimes(1)
    expect(createOrUseCaseSpy).toBeCalledWith(
      expect.objectContaining({
        email: 'email@org.com',
        password: 'any_password',
        phone: '123456',
        city: 'Osasco',
      }),
    )
  })
})
