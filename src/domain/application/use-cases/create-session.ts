import { Org } from '@/domain/enterprise/entities/org'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'

interface CreateSessionUseCaseRequest {
  email: string
  password: string
}

interface CreateSessionUseCaseResponse {
  org: Org
}

export class CreateSessionUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    request: CreateSessionUseCaseRequest,
  ): Promise<CreateSessionUseCaseResponse> {
    const org = await this.findOrgByEmail(request.email)
    this.validatePasswordOrThrow(org, request.password)
    return { org }
  }

  private async findOrgByEmail(email: string) {
    const orgOrNull = await this.orgsRepository.findByEmail(email)
    if (!orgOrNull) {
      throw new Error('Invalid credentials')
    }
    return orgOrNull
  }

  private validatePasswordOrThrow(anOrg: Org, password: string) {
    if (anOrg.password !== password) {
      throw new Error('Invalid credentials')
    }
  }
}
