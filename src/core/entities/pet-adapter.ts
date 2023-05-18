import { Pet, Size } from '@/domain/enterprise/entities/pet'
import { Optional } from '../types/Optional'
import { UniqueEntityId } from './value-objects/unique-entity-id'

interface PetDTO {
  orgId: string
  name: string
  age: number
  size: Size
  description: string
  id: string
}

export class PetAdapter {
  static toEntity(aPetDTO: Optional<PetDTO, 'id'>): Pet {
    return Pet.create(
      {
        age: aPetDTO.age,
        description: aPetDTO.description,
        name: aPetDTO.name,
        size: aPetDTO.size,
        orgId: new UniqueEntityId(aPetDTO.orgId),
      },
      new UniqueEntityId(aPetDTO.id),
    )
  }

  static toDTO(aPet: Pet): PetDTO {
    return {
      age: aPet.age,
      description: aPet.description,
      id: aPet.id.value,
      name: aPet.name,
      size: aPet.size,
      orgId: aPet.orgId.value,
    }
  }
}
