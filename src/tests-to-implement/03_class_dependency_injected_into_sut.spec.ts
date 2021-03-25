import { describe, expect, it } from '@jest/globals'
import { ItemPriceAdjuster } from '../tests-to-implement/03_class_dependency_injected_into_sut'

describe('ItemPriceAdjuster', () => {
  describe('price is less than 100', () => {
    it.skip('marks item price up by the markup percentage', async () => {
      // Arrange
      // Act
      // Assert
    })
  })

  describe('price is greater than 100', () => {
    it.skip('marks item price down by the markdown percentage', async () => {
      // Arrange
      // Act
      // Assert
    })
  })

  describe('price is equal to 100', () => {
    it.skip('will not alter the price', async () => {
      // Arrange
      // Act
      // Assert
    })
  })
})
