import { PetAdapter } from '@/core/entities/pet-adapter'
import { makeCreatePetUseCase } from '@/infra/factories/make-create-pet-use-case'

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
  constructor() {
    this.bindMethod()
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
    const createPetUseCase = makeCreatePetUseCase()
    return createPetUseCase.execute(aPetDTO)
  }
}
