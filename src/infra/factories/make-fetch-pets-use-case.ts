import { isTestEnvironment } from '@/env'
import { makeInMemoryFetchPetsUseCase } from './in-memory/make-in-memory-fetch-pets-use-case'
import { makePrismaFetchPetsUseCase } from './prisma/make-prisma-fetch-pets-use-case'

export function makeFetchPetsUseCase() {
  return isTestEnvironment()
    ? makeInMemoryFetchPetsUseCase()
    : makePrismaFetchPetsUseCase()
}
