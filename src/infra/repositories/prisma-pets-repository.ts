import { UniqueEntityId } from '@/core/entities/value-objects/unique-entity-id'
import { Pet, Size } from '@/domain/enterprise/entities/pet'
import {
  FindManyParams,
  PetsRepository,
} from '@/domain/repositories/pets-repository'
import { prisma } from '../prisma'
import { Pet as PetDTO } from '@prisma/client'

export class PrismaPetsRepository implements PetsRepository {
  async create(aPet: Pet): Promise<Pet> {
    await prisma.pet.create({
      data: {
        age: aPet.age,
        description: aPet.description,
        name: aPet.name,
        size: aPet.size,
        org: {
          connect: {
            id: aPet.orgId.value,
          },
        },
      },
    })

    return aPet
  }

  async findManyByOrgIds(
    orgIds: string[],
    params: FindManyParams,
  ): Promise<Pet[]> {
    const petsDTO = await prisma.pet.findMany({
      where: {
        org: {
          id: {
            in: orgIds,
          },
        },
        size: {
          equals: params.size,
        },
      },
    })

    return this.createPetsFromDTO(petsDTO)
  }

  private createPetsFromDTO(petsDTO: PetDTO[]): Pet[] {
    return petsDTO.map(this.createPetFromDTO)
  }

  private createPetFromDTO(petDTO: PetDTO): Pet {
    return Pet.create(
      {
        age: petDTO.age,
        description: petDTO.description,
        name: petDTO.name,
        size: petDTO.size as Size,
        orgId: new UniqueEntityId(petDTO.orgId),
      },
      new UniqueEntityId(petDTO.id),
    )
  }
}
