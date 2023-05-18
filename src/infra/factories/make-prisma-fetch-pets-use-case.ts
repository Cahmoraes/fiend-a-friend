import { PrismaOrgsRepository } from '../repositories/prisma-orgs-repository'
import { PrismaPetsRepository } from '../repositories/prisma-pets-repository'
import { makeFetchPetsUseCase } from '@/domain/application/use-cases/factories/make-fetch-pets-use-case'

export function makePrismaFetchPetsUseCase() {
  return makeFetchPetsUseCase(
    new PrismaOrgsRepository(),
    new PrismaPetsRepository(),
  )
}
