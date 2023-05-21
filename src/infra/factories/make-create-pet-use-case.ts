import { isTestEnvironment } from '@/env'
import { makeInMemoryCreatePetUseCase } from './in-memory/make-in-memory-create-pet-use-case'
import { makePrismaCreatePetUseCase } from './prisma/make-prisma-create-pet-use-case'

export function makeCreatePetUseCase() {
  return isTestEnvironment()
    ? makeInMemoryCreatePetUseCase()
    : makePrismaCreatePetUseCase()
}
