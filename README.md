# ts-mocking-exercises

The aim of this exercise is to use various mocking techniques to successfully write unit tests for the provided code examples.

## Getting started
By default testing with `mocha, sinon & chai, jest` or `jasmine` is available. Jest is configured to run against `.spec.ts` files and mocha is configured to run against `.test.ts` files and jasmine is configured to run against `.jasmine.ts` files.

- run all tests (mocha, jest and jest): `npm run test`
- run jest tests: `npm run test-jest`
- run mocha tests: `npm run test-mocha`
- run jasmine tests: `npm run test-jasmine`

Feel free to test with whichever testing/mocking framework you like, for example `jasmine`.

## Tests to implement

### 1. Function was called

- [01_object_callback.spec.ts](src/tests-to-implement/01_object_callback.spec.ts)
- Test to check that a specific function was called with a specific value.

### 2. Mock function return value

- [02_function_return_value.spec.ts](src/tests-to-implement/02_function_return_value.spec.ts)
- Mock the return value of a function.

### 3. Mock dependency injected into class

- [03_class_dependency_injected_into_sut.spec.ts](src/tests-to-implement/03_class_dependency_injected_into_sut.spec.ts)
- Mock the implementation and behavior of a injected class dependency.

### 4. Mock dependency initialized within class

- [04_class_dependency_initialized_within_sut.spec.ts](src/tests-to-implement/04_class_dependency_initialized_within_sut.spec.ts)
- Mock the implementation and behavior of a class dependency that is initialized within the system under test.

### 5. Fake timers

- [05_fake_timers.spec.ts](src/tests-to-implement/05_fake_timers.spec.ts)
- Fake out timers to test date / time based scenarios.

### 6. Waiting before assertion

- [06_PubSub.spec.ts](src/tests-to-implement/06_PubSub.spec.ts)
- Test code where the time to reach the state for testing is not known

### 7. Using it all together

- [07_use_it_all.spec.ts](src/tests-to-implement/07_use_it_all.spec.ts)
- Put all the above techniques into action in a single place

## Implemented examples

[Examples](src/tests-implemented) on how to implement these tests can be found for both mocha/sinon/chai as well as jest.
