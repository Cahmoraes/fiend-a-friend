import ExtendedSet from '@cahmoraes93/extended-set'
import { Org } from '@/domain/enterprise/entities/org'
import { OrgsRepository } from '@/domain/repositories/orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items = new ExtendedSet<Org>()

  async fidMany(city: string): Promise<Org[] | null> {
    return this.items.filter((org) => org.city === city).toArray()
  }

  async create(anOrg: Org): Promise<Org> {
    if (!this.items.has(anOrg)) {
      this.items.add(anOrg)
    }
    return anOrg
  }
}
