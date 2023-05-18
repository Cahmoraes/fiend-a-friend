import { assertIfDefined } from '@/core/utils/assertIfDefined'
import { FastifyInstance } from 'fastify'
import { CreateSessionController } from '../controllers/sessions/create-session-controller'

export class SessionRoutes {
  private _app?: FastifyInstance

  constructor() {
    this.bindMethod()
  }

  private bindMethod(): void {
    this.register = this.register.bind(this)
  }

  public async register(app: FastifyInstance): Promise<void> {
    this.app = app
    this.registerCreateSession()
  }

  private get app() {
    assertIfDefined(this._app)
    return this._app
  }

  private set app(other: FastifyInstance) {
    this._app = other
  }

  private registerCreateSession(): void {
    this.app.post('/', new CreateSessionController().intercept)
  }
}
