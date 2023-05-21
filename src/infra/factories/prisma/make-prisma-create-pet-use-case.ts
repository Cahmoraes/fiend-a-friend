import { makeCreatePetUseCase } from '@/domain/application/use-cases/factories/make-create-pet-use-case'
import { PrismaOrgsRepository } from '@/infra/repositories/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/infra/repositories/prisma-pets-repository'

export function makePrismaCreatePetUseCase() {
  return makeCreatePetUseCase(
    new PrismaPetsRepository(),
    new PrismaOrgsRepository(),
  )
}
