import { describe, it, beforeEach, afterEach } from 'mocha'
import { default as sinon } from 'sinon'
import { expect } from 'chai'
import { ItemProcessor } from "../tests-to-implement/07_use_it_all"

describe('ItemProcessor', () => {
  describe('processItems', () => {
    it('will not process items if processing is already busy', async () => {
      // Arrange
      // Act
      // Assert
    })

    describe('given single unprocessed item', () => {
      it('updates the cache with the item', async () => {
       // Arrange
      // Act
      // Assert
      })

      it('publishes an item updated message', async () => {
      // Arrange
      // Act
      // Assert
      })

      it('does not process items that have already been processed', async () => {
      // Arrange
      // Act
      // Assert
      })
    })

    describe('given newly added unprocessed items', () => {
      it('processes all newly added items every x seconds', async () => {
      // Arrange
      // Act
      // Assert
      })
    })

    describe('given multiple unprocessed items', () => {
      it('updates the cache with the item', async () => {
      // Arrange
      // Act
      // Assert
      })

      it('publishes an item updated message', async () => {
      // Arrange
      // Act
      // Assert
      })

      it('does not process items that have already been processed', async () => {
      // Arrange
      // Act
      // Assert
      })
    })
  })
})
