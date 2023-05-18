import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Pet, Size } from '@/domain/enterprise/entities/pet'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { PetsRepository } from '@/domain/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  orgId: string
  name: string
  age: number
  size: Size
  description: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute(
    request: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const org = await this.findOrgByIdOrThrow(request.orgId)
    const pet = Pet.create({
      ...request,
      orgId: new UniqueEntityId(org.id.value),
    })

    await this.petsRepository.create(pet)
    return { pet }
  }

  private async findOrgByIdOrThrow(orgId: string) {
    const org = await this.orgsRepository.findById(orgId)
    if (!org) {
      throw new Error('Org not found')
    }
    return org
  }
}
