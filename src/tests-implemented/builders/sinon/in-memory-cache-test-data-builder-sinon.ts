import { InMemoryCache } from "../../../dependencies/InMemoryCache"
import { TestDataBuilder } from "../test-data-builder"
import { default as sinon, SinonStubbedInstance } from 'sinon'

export class InMemoryCacheTestDataBuilderSinon extends TestDataBuilder<InMemoryCacheTestDataBuilderSinon, SinonStubbedInstance<InMemoryCache>> {
  constructor() {
    super(() => {
      return sinon.createStubInstance(InMemoryCache)
    })
  }

  static create() {
    return new InMemoryCacheTestDataBuilderSinon()
  }

  static createWithRandomProps() {
    return new InMemoryCacheTestDataBuilderSinon().withRandomProps()
  }

  withRandomProps() {
    return this
  }
}