import { InMemoryCache } from "../dependencies/InMemoryCache"
import { ItemRepository } from '../dependencies/ItemRepository'
import { ItemProcessor } from "../tests-to-implement/07_use_it_all"
import { testItemBuilder } from './builders/test_item_builder'
import { default as sinon, SinonStubbedInstance } from 'sinon'
import { expect } from 'chai'
import { ItemRepositoryTestDataBuilder } from "./builders/item-repository-test-data-builder"
import { InMemoryCacheTestDataBuilder } from "./builders/in-memory-cache-test-data-builder"
import { PubSub, PubSubChannels } from "../tests-to-implement/06_PubSub"
import { PubSubTestDataBuilder } from "./builders/pub-sub-test-data-builder"

describe('ItemProcessor', () => {
  beforeEach(() => {
    sinon.useFakeTimers()
  })

  afterEach(() => {
    sinon.clock.restore()
    sinon.restore()
  })

  describe('processItems', () => {
    it('will not process items if processing is already busy', async () => {
      // Arrange
      const itemRepository = ItemRepositoryTestDataBuilder.createWithRandomProps().build()

      const sut = createSut(
        InMemoryCacheTestDataBuilder.createWithRandomProps().build(),
        itemRepository
      )
      // Act
      sut.processItems()
      sut.processItems()
      // Assert
      expect(itemRepository.getAll).to.have.been.calledOnce
    })

    describe('given single unprocessed item', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const item = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilder.create()
          .withItemsForGetAll(item)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilder.createWithRandomProps().build()

        const sut = createSut(inMemoryCache, itemRepository)
        // Act
        await sut.processItems()
        // Assert
        expect(inMemoryCache.update).to.have.been.calledOnceWith(item)
      })

      it('publishes an item updated message', async () => {
        // Arrange
        const item = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilder.create()
          .withItemsForGetAll(item)
          .build()
        const pubSub = PubSubTestDataBuilder.createWithRandomProps().build();

        const sut = createSut(
          InMemoryCacheTestDataBuilder.createWithRandomProps().build(), 
          itemRepository,
          pubSub
        )
        // Act
        await sut.processItems()
        // Assert
        expect(pubSub.publish).to.have.been.calledOnceWith(PubSubChannels.itemUpdated, item)
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

  function createSut(
    cache: InMemoryCache | SinonStubbedInstance<InMemoryCache>,
    itemRepository: ItemRepository | SinonStubbedInstance<ItemRepository>,
    pubSub?: PubSub | SinonStubbedInstance<PubSub>
  ) {
    cache ??= InMemoryCacheTestDataBuilder.createWithRandomProps().build();
    itemRepository ??= ItemRepositoryTestDataBuilder.createWithRandomProps().build();
    pubSub ??= PubSubTestDataBuilder.createWithRandomProps().build();

    sinon.stub(PubSub, 'getInstance').callsFake(() => pubSub as PubSub);

    return new ItemProcessor(
      cache,
      itemRepository as SinonStubbedInstance<ItemRepository> & ItemRepository
    )
  }
})
