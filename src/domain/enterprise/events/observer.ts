export interface Observer<Type> {
  update(data: Type): void
}
