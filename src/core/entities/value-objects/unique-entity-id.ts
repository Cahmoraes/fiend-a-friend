import { randomUUID } from 'node:crypto'

export class UniqueEntityId {
  private _value: string

  constructor(id?: string) {
    this._value = id ?? randomUUID()
  }

  get value(): string {
    return this._value
  }

  public equals(other: UniqueEntityId): boolean {
    return other.value === this.value
  }
}
