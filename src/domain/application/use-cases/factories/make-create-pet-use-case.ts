import { PetsRepository } from '@/domain/repositories/pets-repository'
import { CreatePetUseCase } from '../create-pet'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'

export function makeCreatePetUseCase(
  petsRepository: PetsRepository,
  orgsRepository: OrgsRepository,
) {
  return new CreatePetUseCase(petsRepository, orgsRepository)
}
