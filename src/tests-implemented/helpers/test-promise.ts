export interface TestPromise<T> {
  promise: Promise<T>,
  resolve: (result: T) => Promise<void>,
  reject: (error: any) => Promise<void>
}

export function createPromise<T>(): TestPromise<T> {
  let localResolve = (o: T) => { }
  let localReject = (o: any) => { }
  const promise = new Promise<T>((resolve, reject) => {
    localResolve = resolve
    localReject = reject
  })

  return {
    promise: promise,
    resolve: (result: T) => new Promise((resolve, reject) => {
      console.log('calling local resolve')
      localResolve(result)
      queueMicrotask(() => {
        resolve()
      });
    }),
    reject: (error: any) => new Promise((resolve, reject) => {
      localReject(error)
      queueMicrotask(() => {
        reject()
      });
    }),
  }
}