import { TestDataBuilder } from "../test-data-builder"
import { Item } from "../../../dependencies/Item"
import { ItemRepository } from "../../../dependencies/ItemRepository"
import { testItemBuilder } from "../test_item_builder"

export class ItemRepositoryTestDataBuilderJasmine extends TestDataBuilder<ItemRepositoryTestDataBuilderJasmine, jasmine.SpyObj<ItemRepository>> {
  constructor() {
    super(() => {
      return jasmine.createSpyObj<ItemRepository>(['insert', 'getAll'])
    })
  }

  static create() {
    return new ItemRepositoryTestDataBuilderJasmine()
  }

  static createWithRandomProps() {
    return new ItemRepositoryTestDataBuilderJasmine().withRandomProps()
  }

  withItemsForGetAll(...items: Item[]) {
    return this.withProp(o => {
      o.getAll.and.resolveTo(items)
    })
  }

  withPromiseForGetAll(...itemsPromises: Promise<Item[]>[]) {
    return this.withProp(o => {
      o.getAll.and.returnValues(...itemsPromises)
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