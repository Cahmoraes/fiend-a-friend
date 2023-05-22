import { assertIfDefined } from '@/core/utils/assertIfDefined'
import { FastifyInstance } from 'fastify'
import { CreateOrgController } from '../controllers/orgs/create-org-controller'
import { makeCreateOrgUseCase } from '@/infra/factories/make-create-org-use-case'

export class OrgsRoutes {
  private _app?: FastifyInstance

  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.register = this.register.bind(this)
  }

  public async register(app: FastifyInstance) {
    this.app = app
    this.registerCreateOrg()
  }

  private get app() {
    assertIfDefined(this._app)
    return this._app
  }

  private set app(other: FastifyInstance) {
    this._app = other
  }

  private registerCreateOrg() {
    this.app.post('/', new CreateOrgController(makeCreateOrgUseCase).intercept)
  }
}
