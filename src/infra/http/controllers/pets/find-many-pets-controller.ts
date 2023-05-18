import { PetAdapter } from '@/core/entities/pet-adapter'
import { Pet } from '@/domain/enterprise/entities/pet'
import { makeFindPetUseCase } from '@/infra/factories/make-find-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createPetSchema = z.object({
  city: z.string(),
  size: z.enum(['small', 'medium', 'big']).optional(),
})

type PetSchemaData = z.infer<typeof createPetSchema>

export class FindManyPetsController {
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.intercept = this.intercept.bind(this)
  }

  public async intercept(request: FastifyRequest, reply: FastifyReply) {
    const searchDTO = this.parseQuerySchemaOrThrow(request.query)
    const { pets } = await this.fetchPets(searchDTO)
    const petsDTO = this.createPetsDTO(pets)
    return reply.send({ pets: petsDTO })
  }

  private parseQuerySchemaOrThrow(body: unknown): PetSchemaData {
    return createPetSchema.parse(body)
  }

  private async fetchPets(searchDTO: PetSchemaData) {
    const findManyPetsUseCase = makeFindPetUseCase()
    return findManyPetsUseCase.execute(searchDTO)
  }

  private createPetsDTO(pets: Pet[]) {
    return pets.map((pet) => PetAdapter.adaptToDTO(pet))
  }
}
