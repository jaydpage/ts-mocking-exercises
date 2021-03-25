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
      expect(itemRepository.getAll).calledOnce
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
        expect(inMemoryCache.update).calledOnceWith(item)
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
        expect(pubSub.publish).calledOnceWith(PubSubChannels.itemUpdated, item)
      })

      it('does not process items that have already been processed', async () => {
        // Arrange
        const item = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilder.create()
          .withItemsForGetAll(item)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilder.createWithRandomProps().build()
        const pubSub = PubSubTestDataBuilder.createWithRandomProps().build();

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
      it.skip('processes all newly added items every x seconds', async () => {
        // Arrange
        // Act
        // Assert
      })
    })

    describe('given multiple unprocessed items', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilder.create()
          .withItemsForGetAll(item1, item2)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilder.createWithRandomProps().build()

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

        const itemRepository = ItemRepositoryTestDataBuilder.create()
          .withItemsForGetAll(item1, item2)
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
        expect(pubSub.publish).calledWith(PubSubChannels.itemUpdated, item1)
          .and.calledWith(PubSubChannels.itemUpdated, item2)
          .and.calledTwice
      })

      it('does not process items that have already been processed', async () => {
        // Arrange
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilder.create()
          .withItemsForGetAll(item1, item2)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilder.createWithRandomProps().build()
        const pubSub = PubSubTestDataBuilder.createWithRandomProps().build();

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
