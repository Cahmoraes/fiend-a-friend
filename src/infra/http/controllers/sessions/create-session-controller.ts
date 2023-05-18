import { CreateSessionUseCase } from '@/domain/application/use-cases/create-session'
import { Org } from '@/domain/enterprise/entities/org'
import { PrismaOrgsRepository } from '@/infra/repositories/prisma-orgs-repository'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createSessionSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SessionSchemaData = z.infer<typeof createSessionSchema>

export class CreateSessionController {
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.intercept = this.intercept.bind(this)
  }

  public async intercept(request: FastifyRequest, reply: FastifyReply) {
    const sessionDTO = this.parseBodySchemaOrThrow(request.body)
    const { org } = await this.createSession(sessionDTO)
    const token = await this.createJWT(reply, org)
    return reply.send({ token })
  }

  private parseBodySchemaOrThrow(body: unknown): SessionSchemaData {
    return createSessionSchema.parse(body)
  }

  private async createSession(aSessionDTO: SessionSchemaData) {
    const createPetUseCase = new CreateSessionUseCase(
      new PrismaOrgsRepository(),
    )
    return createPetUseCase.execute(aSessionDTO)
  }

  private createJWT(reply: FastifyReply, org: Org): Promise<string> {
    return reply.jwtSign(
      {
        email: org.email,
      },
      {
        sign: {
          sub: org.id.value,
          expiresIn: '1h',
        },
      },
    )
  }
}
