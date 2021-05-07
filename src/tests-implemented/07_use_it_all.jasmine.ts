import { InMemoryCache } from "../dependencies/InMemoryCache"
import { ItemRepository } from '../dependencies/ItemRepository'
import { ItemProcessor } from "../tests-to-implement/07_use_it_all"
import { testItemBuilder } from './builders/test_item_builder'
import { PubSub, PubSubChannels } from "../tests-to-implement/06_PubSub"
import { createPromise as createTestPromise } from "./helpers/test-promise"
import { Item } from "../dependencies/Item"
import { ItemRepositoryTestDataBuilderJasmine } from "./builders/jasmine/item-repository-test-data-builder-jasmine"
import { InMemoryCacheTestDataBuilderJasmine } from "./builders/jasmine/in-memory-cache-test-data-builder-jasmine"
import { PubSubTestDataBuilderJasmine } from "./builders/jasmine/pub-sub-test-data-builder-jasmine"

describe('ItemProcessor', () => {
  beforeEach(() => {
    jasmine.clock().install()
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  describe('processItems', () => {
    it('will not process items if processing is already busy', async () => {
      // Arrange
      const itemRepository = ItemRepositoryTestDataBuilderJasmine.createWithRandomProps()
      .withPromiseForGetAll(new Promise(() => {}), new Promise(() => {}))
      .build()

      const sut = createSut(
        InMemoryCacheTestDataBuilderJasmine.createWithRandomProps().build(),
        itemRepository
      )
      // Act
      sut.processItems()
      sut.processItems()
      // Assert
      expect(itemRepository.getAll).toHaveBeenCalledTimes(1)
    })

    describe('given single unprocessed item', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const item = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilderJasmine.create()
          .withItemsForGetAll(item)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilderJasmine.createWithRandomProps().build()

        const sut = createSut(inMemoryCache, itemRepository)
        // Act
        await sut.processItems()
        // Assert
        expect(inMemoryCache.update).toHaveBeenCalledWith(item)
      })

      it('publishes an item updated message', async () => {
        // Arrange
        const item = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilderJasmine.create()
          .withItemsForGetAll(item)
          .build()
        const pubSub = PubSubTestDataBuilderJasmine.createWithRandomProps().build();

        const sut = createSut(
          InMemoryCacheTestDataBuilderJasmine.createWithRandomProps().build(),
          itemRepository,
          pubSub
        )
        // Act
        await sut.processItems()
        // Assert
        expect(pubSub.publish).toHaveBeenCalledOnceWith(PubSubChannels.itemUpdated, item)
      })

      it('does not process items that have already been processed', async () => {
        // Arrange
        const item = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilderJasmine.create()
          .withItemsForGetAll(item)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilderJasmine.createWithRandomProps().build()
        const pubSub = PubSubTestDataBuilderJasmine.createWithRandomProps().build();

        const sut = createSut(inMemoryCache, itemRepository, pubSub)
        // Act
        await sut.processItems()
        await sut.processItems()
        // Assert
        expect(inMemoryCache.update).toHaveBeenCalledOnceWith(item)
        expect(pubSub.publish).toHaveBeenCalledOnceWith(PubSubChannels.itemUpdated, item)
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

        const itemRepository = ItemRepositoryTestDataBuilderJasmine.create()
          .withPromiseForGetAll(getAllPromise1.promise, getAllPromise2.promise)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilderJasmine.createWithRandomProps().build()
        const pubSub = PubSubTestDataBuilderJasmine.createWithRandomProps().build();

        const sut = createSut(inMemoryCache, itemRepository, pubSub)
        // Act & Assert
        sut.processItems()

        await getAllPromise1.resolve([item1])
        expect(inMemoryCache.update).toHaveBeenCalledWith(item1)
        expect(inMemoryCache.update).toHaveBeenCalledTimes(1)
        expect(pubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item1)
        expect(pubSub.publish).toHaveBeenCalledTimes(1)

        jasmine.clock().tick(5000)

        await getAllPromise2.resolve([item1, item2, item3])
        expect(inMemoryCache.update).toHaveBeenCalledWith(item2)
        expect(inMemoryCache.update).toHaveBeenCalledWith(item3)
        expect(inMemoryCache.update).toHaveBeenCalledTimes(3)
        expect(pubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item2)
        expect(pubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item3)
        expect(pubSub.publish).toHaveBeenCalledTimes(3)
      })
    })

    describe('given multiple unprocessed items', () => {
      it('updates the cache with the item', async () => {
        // Arrange
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilderJasmine.create()
          .withItemsForGetAll(item1, item2)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilderJasmine.createWithRandomProps().build()

        const sut = createSut(inMemoryCache, itemRepository)
        // Act
        await sut.processItems()
        // Assert
        expect(inMemoryCache.update).toHaveBeenCalledWith(item1)
        expect(inMemoryCache.update).toHaveBeenCalledWith(item2)
        expect(inMemoryCache.update).toHaveBeenCalledTimes(2)
      })

      it('publishes an item updated message', async () => {
        // Arrange
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilderJasmine.create()
          .withItemsForGetAll(item1, item2)
          .build()
        const pubSub = PubSubTestDataBuilderJasmine.createWithRandomProps().build();

        const sut = createSut(
          InMemoryCacheTestDataBuilderJasmine.createWithRandomProps().build(),
          itemRepository,
          pubSub
        )
        // Act
        await sut.processItems()
        // Assert
        expect(pubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item1)
        expect(pubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item2)
        expect(pubSub.publish).toHaveBeenCalledTimes(2)
      })

      it('does not process items that have already been processed', async () => {
        // Arrange
        const item1 = testItemBuilder().build()
        const item2 = testItemBuilder().build()

        const itemRepository = ItemRepositoryTestDataBuilderJasmine.create()
          .withItemsForGetAll(item1, item2)
          .build()
        const inMemoryCache = InMemoryCacheTestDataBuilderJasmine.createWithRandomProps().build()
        const pubSub = PubSubTestDataBuilderJasmine.createWithRandomProps().build();

        const sut = createSut(inMemoryCache, itemRepository, pubSub)
        // Act
        await sut.processItems()
        await sut.processItems()
        // Assert
        expect(inMemoryCache.update).toHaveBeenCalledWith(item1)
        expect(inMemoryCache.update).toHaveBeenCalledWith(item2)
        expect(inMemoryCache.update).toHaveBeenCalledTimes(2)

        expect(pubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item1)
        expect(pubSub.publish).toHaveBeenCalledWith(PubSubChannels.itemUpdated, item2)
        expect(pubSub.publish).toHaveBeenCalledTimes(2)
      })
    })
  })

  function createSut(cache: InMemoryCache, itemRepository: ItemRepository, pubSub?: PubSub) {
    cache ??= InMemoryCacheTestDataBuilderJasmine.createWithRandomProps().build();
    itemRepository ??= ItemRepositoryTestDataBuilderJasmine.createWithRandomProps().build();
    pubSub ??= PubSubTestDataBuilderJasmine.createWithRandomProps().build();

    spyOn(PubSub, 'getInstance').and.callFake(() => pubSub as PubSub);

    return new ItemProcessor(cache, itemRepository)
  }
})
