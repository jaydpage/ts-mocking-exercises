import { InMemoryCache } from "../../dependencies/InMemoryCache"
import { TestDataBuilder } from "./test-data-builder"
import { default as sinon, SinonStubbedInstance } from 'sinon'

export class InMemoryCacheTestDataBuilder extends TestDataBuilder<InMemoryCacheTestDataBuilder, SinonStubbedInstance<InMemoryCache>> {
  constructor() {
      super(() => {
          return sinon.createStubInstance(InMemoryCache)
      })
  }

  static create() {
      return new InMemoryCacheTestDataBuilder()
  }

  static createWithRandomProps() {
    return new InMemoryCacheTestDataBuilder().withRandomProps()
  }

  withRandomProps() {
      return this
  }
}