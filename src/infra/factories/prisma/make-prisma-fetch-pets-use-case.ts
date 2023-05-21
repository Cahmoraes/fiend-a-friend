import { makeFetchPetsUseCase } from '@/domain/application/use-cases/factories/make-fetch-pets-use-case'
import { PrismaOrgsRepository } from '@/infra/repositories/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/infra/repositories/prisma-pets-repository'

export function makePrismaFetchPetsUseCase() {
  return makeFetchPetsUseCase(
    new PrismaOrgsRepository(),
    new PrismaPetsRepository(),
  )
}
