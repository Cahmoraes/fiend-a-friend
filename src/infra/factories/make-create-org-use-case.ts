import { isTestEnvironment } from '@/env'
import { makeInMemoryCreateOrgUseCase } from './in-memory/make-in-memory-create-org-use-case'
import { makePrismaCreateOrgUseCase } from './prisma/make-prisma-create-org-use-case'

export function makeCreateOrgUseCase() {
  return isTestEnvironment()
    ? makeInMemoryCreateOrgUseCase()
    : makePrismaCreateOrgUseCase()
}
