import { OrgAdapter } from '@/core/entities/org-adapter'
import { CreateOrgUseCase } from '@/domain/application/use-cases/create-org'
import { PrismaOrgsRepository } from '@/infra/repositories/prisma-orgs-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createOrgSchema = z.object({
  city: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
})

type CreateOrgData = z.infer<typeof createOrgSchema>

export class CreateOrgController {
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.intercept = this.intercept.bind(this)
  }

  public async intercept(request: FastifyRequest, reply: FastifyReply) {
    const orgDTO = this.parseBodySchemaOrThrow(request.body)
    const { org } = await this.createOrg(orgDTO)
    const orgDTOResponse = OrgAdapter.toDTO(org)
    return reply.send({ org: orgDTOResponse })
  }

  private parseBodySchemaOrThrow(body: unknown): CreateOrgData {
    return createOrgSchema.parse(body)
  }

  private async createOrg(orgDTO: CreateOrgData) {
    const org = OrgAdapter.toEntity(orgDTO)
    const createOrgUseCase = new CreateOrgUseCase(new PrismaOrgsRepository())
    return createOrgUseCase.execute(org)
  }
}
