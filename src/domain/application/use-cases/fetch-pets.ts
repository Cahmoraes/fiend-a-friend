import { Pet, Size } from '@/domain/enterprise/entities/pet'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { PetsRepository } from '@/domain/repositories/pets-repository'

interface FetchPetsUseCaseRequest {
  city: string
  size?: Size
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
    size,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const orgs = await this.orgsRepository.fidMany(city)
    if (!orgs) {
      throw new Error('City not found')
    }

    const orgsId = orgs.map((org) => org.id.value)
    console.log(orgsId)
    const pets = await this.petsRepository.findManyByOrgIds(orgsId, { size })
    return { pets }
  }
}
