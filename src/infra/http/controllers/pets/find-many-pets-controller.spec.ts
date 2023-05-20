import { makePet } from 'tests/factories/make-pet'
import { FindManyPetsController } from './find-many-pets-controller'
import { FetchPetsUseCase } from '@/domain/application/use-cases/fetch-pets'

describe('Find Many Pets Controller', () => {
  const sut = new FindManyPetsController()

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch pets', async () => {
    const fetchPetsUseCase = vi
      .spyOn(FetchPetsUseCase.prototype, 'execute')
      .mockResolvedValue({
        pets: [makePet()],
      })

    const request: any = {
      query: {
        city: 'Osasco',
        size: 'medium',
      },
    }

    const reply: any = {
      send: vi.fn(),
    }

    await sut.intercept(request, reply)

    expect(reply.send).toBeCalledTimes(1)
    expect(fetchPetsUseCase).toBeCalled()
  })
})
