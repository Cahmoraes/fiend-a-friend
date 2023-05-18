import { Org } from '@/domain/enterprise/entities/org'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'
import { prisma } from '../prisma'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Org as OrgDTO } from '@prisma/client'

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string): Promise<Org | null> {
    const orgDTO = await prisma.org.findUnique({
      where: { email },
    })

    if (!orgDTO) {
      return null
    }

    return this.createOrgEntityByDTO(orgDTO)
  }

  private createOrgEntityByDTO(orgDTO: OrgDTO): Org {
    return Org.create(
      {
        city: orgDTO.city,
        email: orgDTO.email,
        password: orgDTO.password_hash,
        phone: orgDTO.phone,
        createdAt: orgDTO.createdAt,
      },
      new UniqueEntityId(orgDTO.id),
    )
  }

  async create(anOrg: Org): Promise<Org> {
    await prisma.org.create({
      data: {
        city: anOrg.city,
        email: anOrg.email,
        password_hash: anOrg.password,
        phone: anOrg.phone,
        id: anOrg.id.value,
      },
    })

    return anOrg
  }

  async findById(id: string): Promise<Org | null> {
    const orgDTO = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    if (!orgDTO) {
      return null
    }

    return this.createOrgEntityByDTO(orgDTO)
  }

  async fidMany(city: string): Promise<Org[] | null> {
    const orgsDTO = await prisma.org.findMany({
      where: {
        city,
      },
    })

    return orgsDTO.map((org) => {
      return this.createOrgEntityByDTO(org)
    })
  }
}
