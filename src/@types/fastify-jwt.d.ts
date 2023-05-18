import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: { email: string }
    user: {
      id: number
      email: string
    }
  }
}
