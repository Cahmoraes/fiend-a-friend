import { Org } from './org'

describe('Org', () => {
  it('should be able to create an Org', () => {
    const org = Org.create({
      city: 'osasco',
      email: 'org@email.com',
      password: '456465',
      phone: '445656645',
    })

    expect(org).toBeInstanceOf(Org)
    expect(org.city).toEqual('osasco')
  })
})
