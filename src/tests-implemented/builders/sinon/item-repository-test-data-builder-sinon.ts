import { TestDataBuilder } from "../test-data-builder"
import { default as sinon, SinonStubbedInstance } from 'sinon'
import { Item } from "../../../dependencies/Item"
import { ItemRepository } from "../../../dependencies/ItemRepository"
import { testItemBuilder } from "../test_item_builder"

export class ItemRepositoryTestDataBuilderSinon extends TestDataBuilder<ItemRepositoryTestDataBuilderSinon, SinonStubbedInstance<ItemRepository>> {
  constructor() {
    super(() => {
      return sinon.createStubInstance(ItemRepository)
    })
  }

  static create() {
    return new ItemRepositoryTestDataBuilderSinon()
  }

  static createWithRandomProps() {
    return new ItemRepositoryTestDataBuilderSinon().withRandomProps()
  }

  withItemsForGetAll(...items: Item[]) {
    return this.withProp(o => {
      o.getAll.resolves(items)
    })
  }

  withPromiseForGetAll(callNumber: number, itemsPromise: Promise<Item[]>) {
    return this.withProp(o => {
      o.getAll.onCall(callNumber).returns(itemsPromise)
    })
  }

  withRandomProps() {
    return this.withItemsForGetAll(
      testItemBuilder().build(),
      testItemBuilder().build(),
      testItemBuilder().build()
    )
  }
}