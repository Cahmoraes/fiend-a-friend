import request from 'supertest'
import { Server } from './server'

const app = new Server().instance

describe('Server', () => {
  it('should return 200', async () => {
    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'Osasco' })

    expect(response.status).toBe(200)
  })
})
