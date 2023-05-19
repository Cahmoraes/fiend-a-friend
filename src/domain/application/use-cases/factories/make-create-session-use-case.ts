import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { CreateSessionUseCase } from '../create-session'

export function makeCreateSessionUseCase(orgsRepository: OrgsRepository) {
  return new CreateSessionUseCase(orgsRepository)
}
