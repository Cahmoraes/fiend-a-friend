import { Org } from '@/domain/enterprise/entities/org'
import { UniqueEntityId } from './value-objects/unique-entity-id'
import { Optional } from '../types/Optional'

interface OrgDTO {
  city: string
  email: string
  password: string
  phone: string
  id: string
}

export class OrgAdapter {
  static adaptToEntity(orgDTO: Optional<OrgDTO, 'id'>): Org {
    return Org.create(
      {
        city: orgDTO.city,
        email: orgDTO.email,
        password: orgDTO.password,
        phone: orgDTO.phone,
      },
      new UniqueEntityId(orgDTO.id),
    )
  }

  static adaptToDTO(org: Org): OrgDTO {
    return {
      id: org.id.value,
      city: org.city,
      email: org.email,
      password: org.password,
      phone: org.phone,
    }
  }
}
