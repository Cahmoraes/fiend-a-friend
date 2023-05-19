import { makeCreateSessionUseCase } from '@/domain/application/use-cases/factories/make-create-session-use-case'
import { PrismaOrgsRepository } from '../repositories/prisma-orgs-repository'

export function makePrismaCreateSessionUseCase() {
  return makeCreateSessionUseCase(new PrismaOrgsRepository())
}
