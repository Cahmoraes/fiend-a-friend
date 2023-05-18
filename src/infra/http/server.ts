import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { PetsRoutes } from './routes/pet-routes'
import { OrgsRoutes } from './routes/org-routes'
import { SessionRoutes } from './routes/session-routes'

export class Server {
  private app = fastify()

  public start(): void {
    this.registerJWT()
    this.registerSessionRoutes()
    this.registerPetRoutes()
    this.registerOrgRoutes()
    this.listen()
  }

  private registerJWT() {
    this.app.register(fastifyJwt, {
      secret: '5ASD5645498DCCXSF',
    })
  }

  private registerSessionRoutes(): void {
    this.app.register(new SessionRoutes().register, {
      prefix: '/sessions',
    })
  }

  private registerPetRoutes(): void {
    this.app.register(new PetsRoutes().register, {
      prefix: '/pets',
    })
  }

  private registerOrgRoutes(): void {
    this.app.register(new OrgsRoutes().register, {
      prefix: '/orgs',
    })
  }

  private async listen(): Promise<void> {
    try {
      await this.app.listen({ port: 3333 })
      console.log('🚀 Server started on port 3333')
    } catch (error) {
      console.log(error)
    }
  }
}
