import { assertIfDefined } from '@/core/utils/assertIfDefined'
import { Org } from '@/domain/enterprise/entities/org'
import { makePrismaCreateSessionUseCase } from '@/infra/factories/make-prisma-create-session-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createSessionSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SessionSchemaData = z.infer<typeof createSessionSchema>

export class CreateSessionController {
  private _reply?: FastifyReply
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.intercept = this.intercept.bind(this)
  }

  public async intercept(request: FastifyRequest, reply: FastifyReply) {
    const sessionDTO = this.parseBodySchemaOrThrow(request.body)
    this.reply = reply
    const { org } = await this.createSession(sessionDTO)
    const token = await this.createJWT(reply, org)
    return reply.send({ token })
  }

  private get reply() {
    assertIfDefined(this._reply)
    return this._reply
  }

  private set reply(other: FastifyReply) {
    this._reply = other
  }

  private parseBodySchemaOrThrow(body: unknown): SessionSchemaData {
    return createSessionSchema.parse(body)
  }

  private async createSession(aSessionDTO: SessionSchemaData) {
    try {
      return await this.performCreateSession(aSessionDTO)
    } catch (error) {
      return this.reply.status(401).send({ error: 'Invalid Credentials' })
    }
  }

  private performCreateSession(aSessionDTO: SessionSchemaData) {
    const createPetUseCase = makePrismaCreateSessionUseCase()
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
