import { execute } from "../tests-to-implement/01_object_callback"

describe('object mock callback', () => {
  describe('execute', () => {
    it('calls the callback', () => {
      // Arrange
      const payload = {
        id: '1',
        amount: 2,
        callback: jasmine.createSpy(),
      }
      // Act
      execute(payload)
      // Assert
      expect(payload.callback).toHaveBeenCalled()
    })

    it('calls the callback once', () => {
      // Arrange
      const payload = {
        id: '1',
        amount: 2,
        callback: jasmine.createSpy(),
      }
      // Act
      execute(payload)
      // Assert
      expect(payload.callback).toHaveBeenCalledTimes(1)
    })

    it('calls the callback with correct value', () => {
      // Arrange
      const payload = {
        id: '1',
        amount: 2,
        callback: jasmine.createSpy(),
      }
      // Act
      execute(payload)
      // Assert
      const expected = '20 for 1'
      expect(payload.callback).toHaveBeenCalledWith(expected)
    })
  })
})
