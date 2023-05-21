import { makeFetchPetsUseCase } from '@/domain/application/use-cases/factories/make-fetch-pets-use-case'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'
import { InMemoryPetsRepository } from 'tests/repositories/in-memory-pets-repository'

export function makeInMemoryFetchPetsUseCase() {
  return makeFetchPetsUseCase(
    new InMemoryOrgsRepository(),
    new InMemoryPetsRepository(),
  )
}
