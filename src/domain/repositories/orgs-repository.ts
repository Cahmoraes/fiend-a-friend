import { Org } from '../enterprise/entities/org'

export interface OrgsRepository {
  create(anOrg: Org): Promise<Org>
  fidMany(city: string): Promise<Org[] | null>
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
}
