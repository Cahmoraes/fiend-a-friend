import { PetAdapter } from '@/core/entities/pet-adapter'
import { CreatePetUseCase } from '@/domain/application/use-cases/create-pet'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createPetSchema = z.object({
  age: z.number(),
  description: z.string(),
  name: z.string(),
  orgId: z.string().uuid(),
  size: z.enum(['small', 'medium', 'big']),
})

type PetSchemaData = z.infer<typeof createPetSchema>

export class CreatePetController {
  private createPetUseCase: CreatePetUseCase

  constructor(makeCreatePetUseCase: () => CreatePetUseCase) {
    this.bindMethod()
    this.createPetUseCase = makeCreatePetUseCase()
  }

  private bindMethod() {
    this.intercept = this.intercept.bind(this)
  }

  public async intercept(request: FastifyRequest, reply: FastifyReply) {
    const petRequestDTO = this.parseBodySchemaOrThrow(request.body)
    const { pet } = await this.createPet(petRequestDTO)
    const petResponseDTO = PetAdapter.toDTO(pet)
    return reply.send({ pet: petResponseDTO })
  }

  private parseBodySchemaOrThrow(body: unknown): PetSchemaData {
    return createPetSchema.parse(body)
  }

  private async createPet(aPetDTO: PetSchemaData) {
    return this.createPetUseCase.execute(aPetDTO)
  }
}
