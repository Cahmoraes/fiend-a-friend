import { FastifyRequest, FastifyReply } from 'fastify'

export async function jwtAuth(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    return reply.send(error)
  }
}
