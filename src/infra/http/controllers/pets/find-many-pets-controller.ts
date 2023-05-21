import { PetAdapter } from '@/core/entities/pet-adapter'
import { Pet } from '@/domain/enterprise/entities/pet'
import { makeFetchPetsUseCase } from '@/infra/factories/make-fetch-pets-use-case'
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

  private parseQuerySchemaOrThrow(query: unknown): PetSchemaData {
    return createPetSchema.parse(query)
  }

  private async fetchPets(searchDTO: PetSchemaData) {
    const findManyPetsUseCase = makeFetchPetsUseCase()
    return findManyPetsUseCase.execute(searchDTO)
  }

  private createPetsDTO(pets: Pet[]) {
    return pets.map((pet) => PetAdapter.toDTO(pet))
  }
}
