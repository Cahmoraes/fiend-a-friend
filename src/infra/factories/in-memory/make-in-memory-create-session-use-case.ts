import { makeCreateSessionUseCase } from '@/domain/application/use-cases/factories/make-create-session-use-case'
import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'

export function makeInMemoryCreateSessionUseCase() {
  return makeCreateSessionUseCase(new InMemoryOrgsRepository())
}
