import { makeOrg } from 'tests/factories/make-org'
import { CreatePetController } from './create-pet-controller'
import { CreatePetUseCase } from '@/domain/application/use-cases/create-pet'
import { makePet } from 'tests/factories/make-pet'

describe('Create Pet Controller', () => {
  const sut = new CreatePetController()

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should create a Pet', async () => {
    const org = makeOrg()
    const createPetUseCaseSpy = vi
      .spyOn(CreatePetUseCase.prototype, 'execute')
      .mockResolvedValue({
        pet: makePet(),
      })

    const request: any = {
      body: {
        age: 12,
        description: 'pet description',
        name: 'pet name',
        orgId: org.id.value,
        size: 'medium',
      },
    }

    const reply: any = {
      send: vi.fn(),
    }

    await sut.intercept(request, reply)

    expect(reply.send).toBeCalledTimes(1)
    expect(createPetUseCaseSpy).toBeCalled()
  })
})
