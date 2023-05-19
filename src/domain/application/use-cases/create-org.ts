import { Org } from '@/domain/enterprise/entities/org'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExists } from './errors/user-already-exists-error'

interface CreateOrgUseCaseRequest {
  email: string
  password: string
  phone: string
  city: string
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  private readonly PASSWORD_SALT = 6
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    request: CreateOrgUseCaseRequest,
  ): Promise<CreateOrgUseCaseResponse> {
    await this.throwErrorIfExistsOrgWithSameEmail(request.email)
    const org = Org.create({
      email: request.email,
      password: await this.passwordHash(request.password),
      phone: request.phone,
      city: request.city,
    })

    await this.orgsRepository.create(org)
    return { org }
  }

  private async throwErrorIfExistsOrgWithSameEmail(
    email: string,
  ): Promise<void> {
    const orgOrNull = await this.orgsRepository.findByEmail(email)
    if (orgOrNull) {
      throw new UserAlreadyExists()
    }
  }

  private passwordHash(password: string): Promise<string> {
    return hash(password, this.PASSWORD_SALT)
  }
}
