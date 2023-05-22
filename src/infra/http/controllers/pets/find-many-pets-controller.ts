import { PetAdapter } from '@/core/entities/pet-adapter'
import { FetchPetsUseCase } from '@/domain/application/use-cases/fetch-pets'
import { Pet } from '@/domain/enterprise/entities/pet'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createPetSchema = z.object({
  city: z.string(),
  size: z.enum(['small', 'medium', 'big']).optional(),
})

type PetSchemaData = z.infer<typeof createPetSchema>

export class FindManyPetsController {
  private FetchPetsUseCase: FetchPetsUseCase

  constructor(makeFetchPetsUseCase: () => FetchPetsUseCase) {
    this.bindMethod()
    this.FetchPetsUseCase = makeFetchPetsUseCase()
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
    return this.FetchPetsUseCase.execute(searchDTO)
  }

  private createPetsDTO(pets: Pet[]) {
    return pets.map((pet) => PetAdapter.toDTO(pet))
  }
}
