import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { FetchPetsUseCase } from '../fetch-pets'
import { PetsRepository } from '@/domain/repositories/pets-repository'

export function makeFetchPetsUseCase(
  orgsRepository: OrgsRepository,
  petsRepository: PetsRepository,
) {
  return new FetchPetsUseCase(orgsRepository, petsRepository)
}
