import { Observer } from '@/domain/enterprise/events/observer'
import { OrgCreated } from '@/domain/enterprise/events/orgs/org-created'

export class Message implements Observer<OrgCreated> {
  update(data: OrgCreated): void {
    console.log(
      `Org from id: ${data.orgId.value} has been created on: ${data.occurredOn}`,
    )
  }
}
