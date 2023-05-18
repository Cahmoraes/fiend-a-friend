import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { CreateOrgUseCase } from '../create-org'

export function makeCreateOrgUseCase(orgsRepository: OrgsRepository) {
  return new CreateOrgUseCase(orgsRepository)
}
