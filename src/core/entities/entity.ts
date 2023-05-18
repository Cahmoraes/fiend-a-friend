import { UniqueEntityId } from './value-objects/unique-entity-id'

export abstract class Entity<Props> {
  protected _props: Props
  protected _id: UniqueEntityId

  protected constructor(props: Props, id?: UniqueEntityId) {
    this._props = props
    this._id = id ?? new UniqueEntityId(id)
  }

  get id(): UniqueEntityId {
    return this._id
  }
}
