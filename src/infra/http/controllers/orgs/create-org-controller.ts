import { OrgAdapter } from '@/core/entities/org-adapter'
import { CreateOrgUseCase } from '@/domain/application/use-cases/create-org'
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
  private createOrgUseCase: CreateOrgUseCase

  constructor(makeCreateOrgUseCase: () => CreateOrgUseCase) {
    this.bindMethod()
    this.createOrgUseCase = makeCreateOrgUseCase()
  }

  private bindMethod() {
    this.intercept = this.intercept.bind(this)
  }

  public async intercept(request: FastifyRequest, reply: FastifyReply) {
    const orgDTO = this.parseBodySchemaOrThrow(request.body)
    const org = await this.createOrg(orgDTO)
    return reply.send({ org: OrgAdapter.toDTO(org) })
  }

  private parseBodySchemaOrThrow(body: unknown): CreateOrgData {
    return createOrgSchema.parse(body)
  }

  private async createOrg(orgDTO: CreateOrgData) {
    const { org } = await this.createOrgUseCase.execute(
      OrgAdapter.toEntity(orgDTO),
    )
    return org
  }
}
