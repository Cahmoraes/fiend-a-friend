import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/Optional'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

export interface OrgProps {
  email: string
  password: string
  phone: string
  city: string
  createdAt: Date
}

export class Org extends Entity<OrgProps> {
  public static create(
    props: Optional<OrgProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    return new Org(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
  }

  get email(): string {
    return this._props.email
  }

  get phone(): string {
    return this._props.phone
  }

  get city() {
    return this._props.city
  }

  get password(): string {
    return this._props.password
  }
}
