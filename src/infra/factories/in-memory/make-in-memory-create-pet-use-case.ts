import { makeCreatePetUseCase } from '@/domain/application/use-cases/factories/make-create-pet-use-case'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'
import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pets-repository'

export function makeInMemoryCreatePetUseCase() {
  return makeCreatePetUseCase(
    new InMemoryPetsRepository(),
    new InMemoryOrgsRepository(),
  )
}
