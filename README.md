# ts-mocking-exercises

The aim of these exercises is to use various mocking techniques to successfully write unit tests for the provided code examples.

## Getting started
Frist get the source onto your machine by cloning this repo. Then then run `npm i`.

Each exercise has it's own implementation and empty ignored tests. Tests have been provided in 3 different frameworks `jest`, `jasmine` and `mocha + sinon + chai`. Jest is configured to run against `.spec.ts` files and mocha is configured to run against `.test.ts` files and jasmine is configured to run against `.jasmine.ts` files.

- run all tests (mocha, jest and jasmine): `npm run test`
- run jest tests: `npm run test-jest`
- run mocha tests: `npm run test-mocha`
- run jasmine tests: `npm run test-jasmine`

## Exercises

The goal is to complete the empty tests for each exercise. Feel free to use whichever testing/mocking framework you like, you do not need to write the tests for all frameworks.

Remember the tests are all ignored so you will have to unignore them before they'll execute. To do that:

- for jasmine, change `xit(` to `it(`
- for jest and mocha, change `it.skip(` to `it(`

### 1. Function was called

- Test to check that a specific function was called with a specific value.
- System under test: [01_object_callback.ts](src/tests-to-implement/01_object_callback.ts)
- Jest: [01_object_callback.spec.ts](src/tests-to-implement/01_object_callback.spec.ts)
- Mocha: [01_object_callback.test.ts](src/tests-to-implement/01_object_callback.test.ts)
- Jasmine: [01_object_callback.jasmine.ts](src/tests-to-implement/01_object_callback.jasmine.ts)

### 2. Mock function return value

- Mock the return value of a function.
- System under test: [02_function_return_value.ts](src/tests-to-implement/02_function_return_value.ts)
- Jest: [02_function_return_value.spec.ts](src/tests-to-implement/02_function_return_value.spec.ts)
- Mocha: [02_function_return_value.test.ts](src/tests-to-implement/02_function_return_value.test.ts)
- Jasmine: [02_function_return_value.jasmine.ts](src/tests-to-implement/02_function_return_value.jasmine.ts)

### 3. Mock dependency injected into class

- Mock the implementation and behavior of a injected class dependency.
- System under test: [03_class_dependency_injected_into_sut.ts](src/tests-to-implement/03_class_dependency_injected_into_sut.ts)
- Jest: [03_class_dependency_injected_into_sut.spec.ts](src/tests-to-implement/03_class_dependency_injected_into_sut.spec.ts)
- Mocha: [03_class_dependency_injected_into_sut.test.ts](src/tests-to-implement/03_class_dependency_injected_into_sut.test.ts)
- Jasmine: [03_class_dependency_injected_into_sut.jasmine.ts](src/tests-to-implement/03_class_dependency_injected_into_sut.jasmine.ts)

### 4. Mock dependency initialized within class

- Mock the implementation and behavior of a class dependency that is initialized within the system under test.
- System under test: [04_class_dependency_initialized_within_sut.ts](src/tests-to-implement/04_class_dependency_initialized_within_sut.ts)
- Jest: [04_class_dependency_initialized_within_sut.spec.ts](src/tests-to-implement/04_class_dependency_initialized_within_sut.spec.ts)
- Mocha: [04_class_dependency_initialized_within_sut.test.ts](src/tests-to-implement/04_class_dependency_initialized_within_sut.test.ts)
- Jasmine: [04_class_dependency_initialized_within_sut.jasmine.ts](src/tests-to-implement/04_class_dependency_initialized_within_sut.jasmine.ts)

### 5. Fake timers

- Fake out timers to test date / time based scenarios.
- System under test: [05_fake_timers.ts](src/tests-to-implement/05_fake_timers.ts)
- Jest: [05_fake_timers.spec.ts](src/tests-to-implement/05_fake_timers.spec.ts)
- Mocha: [05_fake_timers.test.ts](src/tests-to-implement/05_fake_timers.test.ts)
- Jasmine [05_fake_timers.jasmine.ts](src/tests-to-implement/05_fake_timers.jasmine.ts)

### 6. Waiting before assertion

- Test code where the time to reach the state for testing is not known
- System under test: [06_PubSub.ts](src/tests-to-implement/06_PubSub.ts)
- Jest: [06_PubSub.spec.ts](src/tests-to-implement/06_PubSub.spec.ts)
- Mocha: [06_PubSub.test.ts](src/tests-to-implement/06_PubSub.test.ts)
- Jasmine: [06_PubSub.jasmine.ts](src/tests-to-implement/06_PubSub.jasmine.ts)

### 7. Using it all together

- Put all the above techniques into action in a single place
- System under test: [07_use_it_all.ts](src/tests-to-implement/07_use_it_all.ts)
- Jest: [07_use_it_all.spec.ts](src/tests-to-implement/07_use_it_all.spec.ts)
- Mocha: [07_use_it_all.test.ts](src/tests-to-implement/07_use_it_all.test.ts)
- Jasmine: [07_use_it_all.jasmine.ts](src/tests-to-implement/07_use_it_all.jasmine.ts)
