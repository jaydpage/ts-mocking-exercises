import { InMemoryCache } from "../../../dependencies/InMemoryCache"
import { TestDataBuilder } from "../test-data-builder"

export class InMemoryCacheTestDataBuilderJasmine extends TestDataBuilder<InMemoryCacheTestDataBuilderJasmine, jasmine.SpyObj<InMemoryCache>> {
  constructor() {
    super(() => {
      return jasmine.createSpyObj<InMemoryCache>(['update'])
    })
  }

  static create() {
    return new InMemoryCacheTestDataBuilderJasmine()
  }

  static createWithRandomProps() {
    return new InMemoryCacheTestDataBuilderJasmine().withRandomProps()
  }

  withRandomProps() {
    return this
  }
}