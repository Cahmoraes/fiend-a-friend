import { Pet, Size } from '@/domain/enterprise/entities/pet'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { PetsRepository } from '@/domain/repositories/pets-repository'
import { OrgNotFoundError } from './errors/org-not-found-error'
import { PetAdapter } from '@/core/entities/pet-adapter'

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
    await this.findOrgByIdOrThrow(request.orgId)
    const pet = this.createPetFromDTO(request)
    await this.petsRepository.create(pet)
    return { pet }
  }

  private async findOrgByIdOrThrow(orgId: string) {
    const org = await this.orgsRepository.findById(orgId)
    if (!org) throw new OrgNotFoundError()
    return org
  }

  private createPetFromDTO(request: CreatePetUseCaseRequest): Pet {
    return PetAdapter.toEntity({
      ...request,
    })
  }
}
