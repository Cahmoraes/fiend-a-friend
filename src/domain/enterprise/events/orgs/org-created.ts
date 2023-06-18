import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'

export class OrgCreated {
  private _orgId: UniqueEntityId
  private _occurredOn: Date

  constructor(anOrgId: UniqueEntityId) {
    this._orgId = anOrgId
    this._occurredOn = new Date()
  }

  get orgId(): UniqueEntityId {
    return this._orgId
  }

  get occurredOn(): Date {
    return this._occurredOn
  }
}
