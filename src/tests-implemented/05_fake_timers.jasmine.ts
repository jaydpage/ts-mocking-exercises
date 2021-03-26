import { generateDayMessage } from "../tests-to-implement/05_fake_timers"

describe('generateDayMessage', () => {
  beforeEach(() => {
    jasmine.clock().install()
  })
  
  afterEach(() => {
    jasmine.clock().uninstall()
  })

  it('returns a message containing the current time', () => {
    // Arrange
    jasmine.clock().mockDate(new Date('2021-03-01T02:00:00+02:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).toMatch('2:00:00 AM')
  })

  it('returns a message containing the current time after some time has elapsed', () => {
    // Arrange
    jasmine.clock().mockDate(new Date('2021-03-01T02:00:00+02:00'))
    // Act
    expect(generateDayMessage()).toMatch('2:00:00 AM')

    jasmine.clock().tick(63140)
    // Assert
    expect(generateDayMessage()).toMatch('2:01:03 AM')
  })

  it('returns a message containing "Monday" on Mondays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date('2021-03-01T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).toMatch('Monday')
  })

  it('returns a message containing "Tuesday" on Tuesdays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date('2021-03-02T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).toMatch('Tuesday')
  })

  it('returns a message containing "Wednesday" on Wednesdays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date('2021-03-03T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).toMatch('Wednesday')
  })

  it('returns a message containing "Thursday" on Thursdays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date('2021-03-04T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).toMatch('Thursday')
  })

  it('returns a message containing "Friday" on Fridays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date('2021-03-05T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).toMatch('Friday')
  })

  it('returns a message containing "Saturday" on Saturdays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date('2021-03-06T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).toMatch('Saturday')
  })

  it('returns a message containing "Sunday" on Sundays', () => {
    // Arrange
    jasmine.clock().mockDate(new Date('2021-03-07T07:00:00+00:00'))
    // Act
    const result = generateDayMessage()
    // Assert
    expect(result).toMatch('Sunday')
  })
})
