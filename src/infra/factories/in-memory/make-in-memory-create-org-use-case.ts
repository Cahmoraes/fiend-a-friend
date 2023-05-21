import { InMemoryOrgsRepository } from 'tests/repositories/in-memory-orgs-repository'
import { makeCreateOrgUseCase } from '@/domain/application/use-cases/factories/make-create-org-use-case'

export function makeInMemoryCreateOrgUseCase() {
  return makeCreateOrgUseCase(new InMemoryOrgsRepository())
}
