import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import { ItemPriceAdjusterVersion2 } from '../tests-to-implement/04_class_dependency_initialized_within_sut'

describe('ItemPriceAdjusterVersion2', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      // Act
      // Assert
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
      // Arrange
      // Act
      // Assert
    })
  })

  describe('price is equal to 100', () => {
    it('will not alter the price', async () => {
      // Arrange
      // Act
      // Assert
    })
  })
})
