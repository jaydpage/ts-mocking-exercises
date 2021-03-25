import { ItemProcessor } from "../tests-to-implement/07_use_it_all"

describe('ItemProcessor', () => {
  describe('processItems', () => {
    xit('will not process items if processing is already busy', async () => {
      // Arrange
      // Act
      // Assert
    })

    describe('given single unprocessed item', () => {
      xit('updates the cache with the item', async () => {
        // Arrange
        // Act
        // Assert
      })

      xit('publishes an item updated message', async () => {
        // Arrange
        // Act
        // Assert
      })

      xit('does not process items that have already been processed', async () => {
        // Arrange
        // Act
        // Assert
      })
    })

    describe('given newly added unprocessed items', () => {
      xit('processes all newly added items every x seconds', async () => {
        // Arrange
        // Act
        // Assert
      })
    })

    describe('given multiple unprocessed items', () => {
      xit('updates the cache with the item', async () => {
        // Arrange
        // Act
        // Assert
      })

      xit('publishes an item updated message', async () => {
        // Arrange
        // Act
        // Assert
      })

      xit('does not process items that have already been processed', async () => {
        // Arrange
        // Act
        // Assert
      })
    })
  })
})
