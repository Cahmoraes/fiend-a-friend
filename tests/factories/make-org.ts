import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Org, OrgProps } from '@/domain/enterprise/entities/org'

export function makeOrg(overrides?: Partial<OrgProps>, id?: UniqueEntityId) {
  return Org.create(
    {
      city: 'Osasco',
      email: 'org@email',
      password: '123456',
      phone: '1198745632',
      ...overrides,
    },
    id,
  )
}
