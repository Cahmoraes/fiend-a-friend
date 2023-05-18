import { Org } from '@/domain/enterprise/entities/org'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'

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
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    request: CreateOrgUseCaseRequest,
  ): Promise<CreateOrgUseCaseResponse> {
    const org = Org.create({
      email: request.email,
      password: request.password,
      phone: request.phone,
      city: request.city,
    })

    await this.orgsRepository.create(org)
    return { org }
  }
}
