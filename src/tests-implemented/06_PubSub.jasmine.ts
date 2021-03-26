import { PubSub } from "../tests-to-implement/06_PubSub"

describe('PubSub', () => {
  describe('subscribe', () => {
    it('calls subscription callback when publish occurs on channel', async () => {
      // Arrange
      const pubSub = PubSub.getInstance()
      const callback = jasmine.createSpy()
      const callbackCalled = listenForCall(callback)
      const channel = 'fooBarChannel'
      const payload = { foo: 'bar' }
      await pubSub.subscribe(channel, callback)
      // Act
      await pubSub.publish(channel, payload)
      // Assert
      await callbackCalled
      expect(callback).toHaveBeenCalledWith(payload)
    })

    it('calls all subscription callbacks when publish occurs on channel', async () => {
      // Arrange
      const pubSub = PubSub.getInstance()
      const callback1 = jasmine.createSpy()
      const callback2 = jasmine.createSpy()
      const callback1Called = listenForCall(callback1)
      const callback2Called = listenForCall(callback2)
      const channel = 'fooBarChannel'
      const payload = { foo: 'bar' }
      await pubSub.subscribe(channel, callback1)
      await pubSub.subscribe(channel, callback2)
      // Act
      await pubSub.publish(channel, payload)
      // Assert
      await callback1Called
      expect(callback1).toHaveBeenCalledWith(payload)
      await callback2Called
      expect(callback2).toHaveBeenCalledWith(payload)
    })
  })

  async function listenForCall(callback: jasmine.Spy) {
    return new Promise<void>((resolve) => {
      callback.and.callFake(() => {
        resolve()
      })
    })
  }
})
