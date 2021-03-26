import { TestDataBuilder } from "../test-data-builder"
import { PubSub } from "../../../tests-to-implement/06_PubSub"

export class PubSubTestDataBuilderJasmine extends TestDataBuilder<PubSubTestDataBuilderJasmine, jasmine.SpyObj<PubSub>> {
  constructor() {
    super(() => {
      return jasmine.createSpyObj<PubSub>(['publish', 'subscribe'])
    })
  }

  static create() {
    return new PubSubTestDataBuilderJasmine()
  }

  static createWithRandomProps() {
    return new PubSubTestDataBuilderJasmine().withRandomProps()
  }

  withRandomProps() {
    return this
  }
}