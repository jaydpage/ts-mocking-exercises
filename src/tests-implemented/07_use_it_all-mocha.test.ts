import { InMemoryCache } from "../dependencies/InMemoryCache"
import { ItemRepository } from '../dependencies/ItemRepository'
import { ItemProcessor } from "../tests-to-implement/07_use_it_all"
import { testItemBuilder } from './builders/test_item_builder'
import { default as sinon, SinonStubbedInstance } from 'sinon'
import * as chai from 'chai';
import { expect } from 'chai'
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

describe('ItemProcessor', () => {
  beforeEach(() => {
    sinon.useFakeTimers()
  })

  afterEach(() => {
    sinon.clock.restore()
  })

  describe('processItems', () => {
    it('will not process items if processing is already busy', async () => {
      // Arrange
      const inMemoryCache = sinon.createStubInstance(InMemoryCache)
      const itemRepository = sinon.createStubInstance(ItemRepository)

      const sut = createSut(inMemoryCache, itemRepository)
      // Act
      sut.processItems()
      sut.processItems()
      // Assert
      expect(itemRepository.getAll).to.have.been.calledOnce
    })

    function createSut(
      cache: InMemoryCache | SinonStubbedInstance<InMemoryCache>,
      itemRepository: ItemRepository | SinonStubbedInstance<ItemRepository>
    ) {
      return new ItemProcessor(
        cache, 
        itemRepository as SinonStubbedInstance<ItemRepository> & ItemRepository
      )
    }

    describe('given single unprocessed item', () => {
      it.skip('updates the cache with the item', async () => {
        // Arrange
        // Act
        // Assert
      })

      it.skip('publishes an item updated message', async () => {
        // Arrange
        // Act
        // Assert
      })

      it.skip('does not process items that have already been processed', async () => {
        // Arrange
        // Act
        // Assert
      })
    })

    describe('given newly added unprocessed items', () => {
      it.skip('processes all newly added items every x seconds', async () => {
        // Arrange
        // Act
        // Assert
      })
    })

    describe('given multiple unprocessed items', () => {
      it.skip('updates the cache with the item', async () => {
        // Arrange
        // Act
        // Assert
      })

      it.skip('publishes an item updated message', async () => {
        // Arrange
        // Act
        // Assert
      })

      it.skip('does not process items that have already been processed', async () => {
        // Arrange
        // Act
        // Assert
      })
    })
  })
})