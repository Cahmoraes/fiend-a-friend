import { PrismaOrgsRepository } from '../../repositories/prisma-orgs-repository'
import { makeCreateOrgUseCase } from '@/domain/application/use-cases/factories/make-create-org-use-case'

export function makePrismaCreateOrgUseCase() {
  return makeCreateOrgUseCase(new PrismaOrgsRepository())
}
