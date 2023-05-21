import { isTestEnvironment } from '@/env'
import { makeInMemoryCreateSessionUseCase } from './in-memory/make-in-memory-create-session-use-case'
import { makePrismaCreateSessionUseCase } from './prisma/make-prisma-create-session-use-case'

export function makeCreateSessionUseCase() {
  return isTestEnvironment()
    ? makeInMemoryCreateSessionUseCase()
    : makePrismaCreateSessionUseCase()
}
