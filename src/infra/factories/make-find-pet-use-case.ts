import { FetchPetsUseCase } from '@/domain/application/use-cases/fetch-pets'
import { PrismaOrgsRepository } from '../repositories/prisma-orgs-repository'
import { PrismaPetsRepository } from '../repositories/prisma-pets-repository'

export function makeFindPetUseCase() {
  return new FetchPetsUseCase(
    new PrismaOrgsRepository(),
    new PrismaPetsRepository(),
  )
}
