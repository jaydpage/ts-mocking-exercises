import { testItemBuilder } from './builders/test_item_builder'
import * as dependencies from '../dependencies/get_all'
import { getAllItemsOnSale } from '../tests-to-implement/02_function_return_value'

describe('function mock return value', () => {
  describe('getAllItemsOnSale', () => {
    it('returns only prices under 10', async () => {
      // Arrange
      const itemOnSale = testItemBuilder().withPrice(9).build()
      const itemNotOnSale = testItemBuilder().withPrice(10).build()

      spyOn(dependencies, "getAll").and.resolveTo([
        itemOnSale,
        itemNotOnSale,
      ]);
      // Act
      const result = await getAllItemsOnSale()
      // Assert
      expect(result).toEqual([itemOnSale])
    })
  })
})