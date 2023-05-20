import { CreateOrgUseCase } from '@/domain/application/use-cases/create-org'
import { CreateOrgController } from './create-org-controller'
import { makeOrg } from 'tests/factories/make-org'

describe('Create Org Controller', () => {
  const sut = new CreateOrgController()
  const findManyPetsUseCaseSpy = vi
    .spyOn(CreateOrgUseCase.prototype, 'execute')
    .mockResolvedValueOnce({ org: makeOrg() })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should create an Org', async () => {
    const request: any = {
      body: {
        city: 'Osasco',
        size: 'medium',
      },
    }

    const reply: any = {
      send: vi.fn(),
    }

    await sut.intercept(request, reply)

    expect(reply.send).toBeCalledTimes(1)
    expect(findManyPetsUseCaseSpy).toBeCalledTimes(1)
  })
})
