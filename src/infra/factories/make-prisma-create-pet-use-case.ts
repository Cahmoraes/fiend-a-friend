import { PrismaPetsRepository } from '../repositories/prisma-pets-repository'
import { PrismaOrgsRepository } from '../repositories/prisma-orgs-repository'
import { makeCreatePetUseCase } from '@/domain/application/use-cases/factories/make-create-pet-use-case'

export function makePrismaCreatePetUseCase() {
  return makeCreatePetUseCase(
    new PrismaPetsRepository(),
    new PrismaOrgsRepository(),
  )
}
