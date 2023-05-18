import { CreatePetUseCase } from '@/domain/application/use-cases/create-pet'
import { PrismaPetsRepository } from '../repositories/prisma-pets-repository'
import { PrismaOrgsRepository } from '../repositories/prisma-orgs-repository'

export function makePetUseCase() {
  return new CreatePetUseCase(
    new PrismaPetsRepository(),
    new PrismaOrgsRepository(),
  )
}
