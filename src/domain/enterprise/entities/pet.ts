import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Optional } from '@/core/types/Optional'

export type Size = 'medium' | 'small' | 'big'

export interface PetProps {
  orgId: UniqueEntityId
  name: string
  description: string
  age: number
  size: Size
  createdAt: Date
}

export class Pet extends Entity<PetProps> {
  public static create(
    props: Optional<PetProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    return new Pet(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )
  }

  get orgId(): UniqueEntityId {
    return this._props.orgId
  }

  get name(): string {
    return this._props.name
  }

  get description(): string {
    return this._props.description
  }

  get age(): number {
    return this._props.age
  }

  get size(): Size {
    return this._props.size
  }
}
