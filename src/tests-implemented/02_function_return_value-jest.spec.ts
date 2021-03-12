import { testItemBuilder } from './builders/test_item_builder'
import { getAll } from '../dependencies/get_all'
import { createTypedMockFunction } from './helpers/jest_typed_mock'
import { getAllItemsOnSale } from '../tests-to-implement/02_function_return_value'

jest.mock('../dependencies/get_all')

describe('function mock return value', () => {
  describe('getAllItemsOnSale', () => {
    it('returns only prices under 10', async () => {
      // Arrange
      const itemOnSale = testItemBuilder().withPrice(9).build()
      const itemNotOnSale = testItemBuilder().withPrice(10).build()

      createTypedMockFunction(getAll).mockImplementation(() => [
        itemOnSale,
        itemNotOnSale,
      ])
      // Act
      const result = await getAllItemsOnSale()
      // Assert
      expect(result).toEqual([itemOnSale])
    })
  })
})