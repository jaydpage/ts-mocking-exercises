import { testItemBuilder } from './builders/test_item_builder'
import { PricingService } from '../dependencies/PricingService'
import { ItemPriceAdjuster } from '../tests-to-implement/03_class_dependency_injected_into_sut'

describe('ItemPriceAdjuster', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      const item = testItemBuilder().withPrice(9).build()
      const pricingService = {
        getMarkUpPercentage: jasmine.createSpy().and.callFake(() => 10),
      } as any

      const sut = new ItemPriceAdjuster(pricingService)
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
      const mockPricingService = jasmine.createSpyObj<PricingService>(['getMarkDownPercentage'])
      mockPricingService.getMarkDownPercentage.and.callFake(() => 20)

      const sut = new ItemPriceAdjuster(mockPricingService)
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
      const pricingService = new PricingService()

      const sut = new ItemPriceAdjuster(pricingService)
      // Act
      const result = await sut.adjustPrice(item)
      // Assert
      expect(result.price).toEqual(100)
    })
  })
})
