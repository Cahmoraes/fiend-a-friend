import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'test']).default('development'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(_env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data

export function isTestEnvironment(): boolean {
  return env.NODE_ENV === 'test'
}

export function isDevelopmentEnvironment(): boolean {
  return env.NODE_ENV === 'development'
}
