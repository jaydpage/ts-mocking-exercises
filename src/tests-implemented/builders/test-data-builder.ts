export class ObjectBuilderBase<T> {
  private readonly mutations: Array<(entity: T) => void> = []

  constructor(protected createType: () => T) {
  }

  protected createNewObject(): T {
      return this.createType()
  }

  withProp(mutation: ((entity: T) => void)): this {
      this.mutations.push(mutation)
      return this
  }

  build(): T {
      const entity = this.createNewObject()
      this.mutations.forEach(m => m(entity))
      return entity
  }

  buildList(count: number): T[] {
      const list = []
      for (let i = 0; i < count; i++) {
          list.push(this.build())
      }
      return list
  }
}

export abstract class TestDataBuilder<TBuilder, T> extends ObjectBuilderBase<T> {
  abstract withRandomProps(): TBuilder
}
