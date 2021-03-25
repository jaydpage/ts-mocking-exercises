import { TestDataBuilder } from "./test-data-builder"
import { default as sinon, SinonStubbedInstance } from 'sinon'
import { PubSub } from "../../tests-to-implement/06_PubSub"

export class PubSubTestDataBuilder extends TestDataBuilder<PubSubTestDataBuilder, SinonStubbedInstance<PubSub>> {
  constructor() {
      super(() => {
          return sinon.createStubInstance(PubSub)
      })
  }

  static create() {
      return new PubSubTestDataBuilder()
  }

  static createWithRandomProps() {
    return new PubSubTestDataBuilder().withRandomProps()
  }

  withRandomProps() {
      return this
  }
}