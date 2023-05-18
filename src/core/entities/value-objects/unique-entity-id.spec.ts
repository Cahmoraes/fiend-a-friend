import { UniqueEntityId } from './unique-entity-id'

describe('UniqueEntityId', () => {
  it('should create an Unique Identity Id with random value', () => {
    const uniqueEntityId = new UniqueEntityId()
    expect(uniqueEntityId.value).toEqual(expect.any(String))
  })

  it('should create an Unique Identity Id with fixed value', () => {
    const uniqueEntityId = new UniqueEntityId('123')
    expect(uniqueEntityId.value).toEqual('123')
  })
})
