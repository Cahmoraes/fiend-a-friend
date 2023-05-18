import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { PetsRoutes } from './routes/pet-routes'
import { OrgsRoutes } from './routes/org-routes'
import { SessionRoutes } from './routes/session-routes'
import { env } from '@/env'
import { ServerRoutesEnum } from '@/core/entities/server-routes-enum'

export class Server {
  private readonly app = fastify()
  private readonly JWT_SECRET = env.JWT_SECRET
  private readonly PORT = env.PORT

  public start(): void {
    this.registerJWT()
    this.registerSessionRoutes()
    this.registerPetRoutes()
    this.registerOrgRoutes()
    this.listen()
  }

  private registerJWT() {
    this.app.register(fastifyJwt, {
      secret: this.JWT_SECRET,
    })
  }

  private registerSessionRoutes(): void {
    this.app.register(new SessionRoutes().register, {
      prefix: ServerRoutesEnum.SESSIONS,
    })
  }

  private registerPetRoutes(): void {
    this.app.register(new PetsRoutes().register, {
      prefix: ServerRoutesEnum.PETS,
    })
  }

  private registerOrgRoutes(): void {
    this.app.register(new OrgsRoutes().register, {
      prefix: ServerRoutesEnum.ORGS,
    })
  }

  private async listen(): Promise<void> {
    try {
      await this.app.listen({ port: this.PORT })
      console.log('🚀 Server started on port 3333')
    } catch (error) {
      console.log(error)
    }
  }
}
