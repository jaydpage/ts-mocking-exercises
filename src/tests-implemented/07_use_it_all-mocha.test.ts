import { describe, it, beforeEach, afterEach } from 'mocha'
import { InMemoryCache } from "../dependencies/InMemoryCache"
import { ItemRepository } from '../dependencies/ItemRepository'
import { ItemProcessor } from "../tests-to-implement/07_use_it_all"
import { testItemBuilder } from './builders/test_item_builder'
import { default as sinon, SinonStubbedInstance } from 'sinon'
import { expect } from 'chai'
import { ItemRepositoryTestDataBuilderSinon } from "./builders/sinon/item-repository-test-data-builder-sinon"
import { InMemoryCacheTestDataBuilderSinon } from "./builders/sinon/in-memory-cache-test-data-builder-sinon"
import { PubSub, PubSubChannels } from "../tests-to-implement/06_PubSub"
import { PubSubTestDataBuilderSinon } from "./builders/sinon/pub-sub-test-data-builder-sinon"
import { createPromise as createTestPromise } from "./helpers/test-promise"
import { Item } from "../dependencies/Item"

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
      const itemRepository = ItemRepositoryTestDataBuilderSinon.createWithRandomProps().build()

      const sut = createSut(
        InMemoryCacheTestDataBuilderSinon.createWithRandomProps().build(),
        itemRepository
      )
      // Act
      sut.processItems()
      sut.processItems()
      // Assert
      expect(itemRepository.getAll).calledOnce
    })

    describe('given single unprocessed item', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const item = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilderSinon.create()
          .withItemsForGetAll(item)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilderSinon.createWithRandomProps().build()

        const sut = createSut(inMemoryCache, itemRepository)
        // Act
        await sut.processItems()
        // Assert
        expect(inMemoryCache.update).calledOnceWith(item)
      })

      it('publishes an item updated message', async () => {
        // Arrange
        const item = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilderSinon.create()
          .withItemsForGetAll(item)
          .build()
        const pubSub = PubSubTestDataBuilderSinon.createWithRandomProps().build();

        const sut = createSut(
          InMemoryCacheTestDataBuilderSinon.createWithRandomProps().build(),
          itemRepository,
          pubSub
        )
        // Act
        await sut.processItems()
        // Assert
        expect(pubSub.publish).calledOnceWith(PubSubChannels.itemUpdated, item)
      })

      it('does not process items that have already been processed', async () => {
        // Arrange
        const item = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilderSinon.create()
          .withItemsForGetAll(item)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilderSinon.createWithRandomProps().build()
        const pubSub = PubSubTestDataBuilderSinon.createWithRandomProps().build();

        const sut = createSut(inMemoryCache, itemRepository, pubSub)
        // Act
        await sut.processItems()
        await sut.processItems()
        // Assert
        expect(inMemoryCache.update).calledOnceWith(item)
        expect(pubSub.publish).calledOnceWith(PubSubChannels.itemUpdated, item)
      })
    })

    describe('given newly added unprocessed items', () => {
      it('processes all newly added items every x seconds', async () => {
        // Arrange
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()
        const item3 = testItemBuilder().build()
        const getAllPromise1 = createTestPromise<Item[]>();
        const getAllPromise2 = createTestPromise<Item[]>();

        const itemRepository = ItemRepositoryTestDataBuilderSinon.create()
          .withPromiseForGetAll(0, getAllPromise1.promise)
          .withPromiseForGetAll(1, getAllPromise2.promise)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilderSinon.createWithRandomProps().build()
        const pubSub = PubSubTestDataBuilderSinon.createWithRandomProps().build();

        const sut = createSut(inMemoryCache, itemRepository, pubSub)
        // Act & Assert
        sut.processItems()

        await getAllPromise1.resolve([item1])
        expect(inMemoryCache.update).calledWith(item1).and.calledOnce
        expect(pubSub.publish).calledWith(PubSubChannels.itemUpdated, item1).and.calledOnce
        
        sinon.clock.tick(5000)
        
        await getAllPromise2.resolve([item1, item2, item3])
        expect(inMemoryCache.update).calledWith(item2)
          .and.calledWith(item3)
          .and.calledThrice
        expect(pubSub.publish).calledWith(PubSubChannels.itemUpdated, item2)
          .and.calledWith(PubSubChannels.itemUpdated, item3)
          .and.calledThrice
      })
    })

    describe('given multiple unprocessed items', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilderSinon.create()
          .withItemsForGetAll(item1, item2)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilderSinon.createWithRandomProps().build()

        const sut = createSut(inMemoryCache, itemRepository)
        // Act
        await sut.processItems()
        // Assert
        expect(inMemoryCache.update).calledWith(item1)
          .and.calledWith(item2)
          .and.calledTwice
      })

      it('publishes an item updated message', async () => {
        // Arrange
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilderSinon.create()
          .withItemsForGetAll(item1, item2)
          .build()
        const pubSub = PubSubTestDataBuilderSinon.createWithRandomProps().build();

        const sut = createSut(
          InMemoryCacheTestDataBuilderSinon.createWithRandomProps().build(),
          itemRepository,
          pubSub
        )
        // Act
        await sut.processItems()
        // Assert
        expect(pubSub.publish).calledWith(PubSubChannels.itemUpdated, item1)
          .and.calledWith(PubSubChannels.itemUpdated, item2)
          .and.calledTwice
      })

      it('does not process items that have already been processed', async () => {
        // Arrange
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilderSinon.create()
          .withItemsForGetAll(item1, item2)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilderSinon.createWithRandomProps().build()
        const pubSub = PubSubTestDataBuilderSinon.createWithRandomProps().build();

        const sut = createSut(inMemoryCache, itemRepository, pubSub)
        // Act
        await sut.processItems()
        await sut.processItems()
        // Assert
        expect(inMemoryCache.update).calledWith(item1)
          .and.calledWith(item2)
          .and.calledTwice
        expect(pubSub.publish).calledWith(PubSubChannels.itemUpdated, item1)
          .and.calledWith(PubSubChannels.itemUpdated, item2)
          .and.calledTwice
      })
    })
  })

  function createSut(
    cache: InMemoryCache | SinonStubbedInstance<InMemoryCache>,
    itemRepository: ItemRepository | SinonStubbedInstance<ItemRepository>,
    pubSub?: PubSub | SinonStubbedInstance<PubSub>
  ) {
    cache ??= InMemoryCacheTestDataBuilderSinon.createWithRandomProps().build();
    itemRepository ??= ItemRepositoryTestDataBuilderSinon.createWithRandomProps().build();
    pubSub ??= PubSubTestDataBuilderSinon.createWithRandomProps().build();

    sinon.stub(PubSub, 'getInstance').callsFake(() => pubSub as PubSub);

    return new ItemProcessor(
      cache,
      itemRepository as SinonStubbedInstance<ItemRepository> & ItemRepository
    )
  }
})
