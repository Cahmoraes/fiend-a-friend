import { assertIfDefined } from '@/core/utils/assertIfDefined'
import { FastifyInstance } from 'fastify'
import { CreatePetController } from '../controllers/pets/create-pet-controller'
import { FindManyPetsController } from '../controllers/pets/find-many-pets-controller'
import { jwtAuth } from '../midllewares/jwt-auth'

export class PetsRoutes {
  private _app?: FastifyInstance

  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.register = this.register.bind(this)
  }

  public async register(app: FastifyInstance): Promise<void> {
    this.app = app
    this.registerCreatePet()
    this.registerFindManyPetByCity()
  }

  private get app() {
    assertIfDefined(this._app)
    return this._app
  }

  private set app(other: FastifyInstance) {
    this._app = other
  }

  private registerCreatePet(): void {
    this.app.post(
      '/',
      {
        onRequest: [jwtAuth],
      },
      new CreatePetController().intercept,
    )
  }

  private registerFindManyPetByCity(): void {
    this.app.get('/', new FindManyPetsController().intercept)
  }
}
