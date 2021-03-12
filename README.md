# ts-mocking-exercises

The aim of this exercise is to use various mocking techniques to successfully write unit tests for the provided code examples.

### 1. Function was called

Test to check that a specific function was called with a specific value.
[01_object_callback.spec.ts](src/tests-to-implement/01_object_callback.spec.ts)

### 2. Mock function return value

Mock the return value of a function.
[02_function_return_value.spec.ts](src/tests-to-implement/02_function_return_value.spec.ts)

### 3. Mock dependency injected into class

Mock the implementation and behavior of a injected class dependency
[03_class_dependency_injected_into_sut.spec.ts](src/tests-to-implement/03_class_dependency_injected_into_sut.spec.ts)

### 4. Mock dependency initialized within class

Mock the implementation and behavior of a class dependency that is initialized within the system under dest
[04_class_dependency_initialized_within_sut.spec.ts](src/tests-to-implement/04_class_dependency_initialized_within_sut.spec.ts)

### 5. Fake timers

Fake out timers to test date / time based scenarios
[05_fake_timers.spec.ts](src/tests-to-implement/05_fake_timers.spec.ts)

### 6. Waiting before assertion

Test code where the time to reach the state for testing is not known
[06_PubSub.spec.ts](src/tests-to-implement/06_PubSub.spec.ts)

### 7. Using it all together

Put all the above techniques into action in a single place
[07_use_it_all.spec.ts](src/tests-to-implement/07_use_it_all.spec.ts)

### Implemented examples

[Examples](src/tests-implemented) on how to implement these tests can be found for both mocha/sinon/chai as well as jest.