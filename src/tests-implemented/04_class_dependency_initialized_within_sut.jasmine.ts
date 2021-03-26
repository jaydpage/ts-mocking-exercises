import { PricingService } from '../dependencies/PricingService'
import { testItemBuilder } from './builders/test_item_builder'
import { ItemPriceAdjusterVersion2 } from '../tests-to-implement/04_class_dependency_initialized_within_sut'

describe('ItemPriceAdjusterVersion2', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      const item = testItemBuilder().withPrice(9).build()
      spyOn(PricingService.prototype, "getMarkUpPercentage").and.returnValue(10);

      const sut = new ItemPriceAdjusterVersion2()
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(9.9)
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
      // Arrange
      const item = testItemBuilder().withPrice(145).build()
      spyOn(PricingService.prototype, "getMarkDownPercentage").and.returnValue(20);

      const sut = new ItemPriceAdjusterVersion2()
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(116)
    })
  })

  describe('price is equal to 100', () => {
    it('will not alter the price', async () => {
      // Arrange
      const item = testItemBuilder().withPrice(100).build()

      const sut = new ItemPriceAdjusterVersion2()
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(100)
    })
  })
})
