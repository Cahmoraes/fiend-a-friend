import { Org } from '@/domain/enterprise/entities/org'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentails-error'

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
    const org = await this.findOrgByEmailOrThrow(request.email)
    await this.validatePasswordsOrThrow(request.password, org.password)
    return { org }
  }

  private async findOrgByEmailOrThrow(email: string) {
    const orgOrNull = await this.orgsRepository.findByEmail(email)
    if (!orgOrNull) {
      throw new InvalidCredentialsError()
    }
    return orgOrNull
  }

  private async validatePasswordsOrThrow(
    password: string,
    orgHashedPassword: string,
  ): Promise<void> {
    const isSamePassword = await compare(password, orgHashedPassword)
    if (!isSamePassword) {
      throw new InvalidCredentialsError()
    }
  }
}
