import { TestDataBuilder } from "../test-data-builder"
import { default as sinon, SinonStubbedInstance } from 'sinon'
import { PubSub } from "../../../tests-to-implement/06_PubSub"

export class PubSubTestDataBuilderSinon extends TestDataBuilder<PubSubTestDataBuilderSinon, SinonStubbedInstance<PubSub>> {
  constructor() {
    super(() => {
      return sinon.createStubInstance(PubSub)
    })
  }

  static create() {
    return new PubSubTestDataBuilderSinon()
  }

  static createWithRandomProps() {
    return new PubSubTestDataBuilderSinon().withRandomProps()
  }

  withRandomProps() {
    return this
  }
}