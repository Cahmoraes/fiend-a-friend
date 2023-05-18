import { Server } from './infra/http/server'

// import { Org } from './domain/enterprise/entities/org'

const server = new Server()
server.start()

// import { Pet } from './domain/enterprise/entities/pet'
// import { prisma } from './infra/prisma'
// ;(async () => {
//   await prisma.pet.deleteMany()
//   await prisma.org.deleteMany()

//   const osasco_1 = Org.create({
//     city: 'Osasco',
//     email: 'osasco0@email.com',
//     password: '12313',
//     phone: '123456',
//   })

//   await prisma.org.create({
//     data: {
//       id: osasco_1.id.value,
//       city: osasco_1.city,
//       email: osasco_1.email,
//       password_hash: osasco_1.password,
//       phone: osasco_1.phone,
//     },
//   })

//   const osasco_2 = Org.create({
//     city: 'Osasco',
//     email: 'osasco20@email.com',
//     password: '1231312',
//     phone: '12345611',
//   })

//   await prisma.org.create({
//     data: {
//       id: osasco_2.id.value,
//       city: osasco_2.city,
//       email: osasco_2.email,
//       password_hash: osasco_2.password,
//       phone: osasco_2.phone,
//     },
//   })

//   const bolt = Pet.create({
//     age: 7,
//     description: 'fofinho e danado',
//     name: 'Bolt',
//     orgId: osasco_1.id,
//     size: 'medium',
//   })

//   await prisma.pet.create({
//     data: {
//       age: bolt.age,
//       description: bolt.description,
//       name: bolt.name,
//       size: bolt.size,
//       org: {
//         connect: {
//           id: osasco_1.id.value,
//         },
//       },
//     },
//   })

//   const bob = Pet.create({
//     age: 13,
//     description: 'fofinho e bonzinho',
//     name: 'Bob',
//     orgId: osasco_2.id,
//     size: 'small',
//   })

//   await prisma.pet.create({
//     data: {
//       age: bob.age,
//       description: bob.description,
//       name: bob.name,
//       size: bob.size,
//       org: {
//         connect: {
//           id: osasco_2.id.value,
//         },
//       },
//     },
//   })

//   const orgIds = await prisma.org.findMany({
//     where: {
//       city: 'Osasco',
//     },
//     select: {
//       id: true,
//     },
//   })

//   const ids = orgIds.map((orgId) => orgId.id)

//   const pets = await prisma.pet.findMany({
//     where: {
//       orgId: {
//         in: ids,
//       },
//     },
//   })

//   console.log(pets)
// })()
