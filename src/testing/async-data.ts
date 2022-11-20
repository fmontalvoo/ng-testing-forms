import { defer, of } from "rxjs";

export function asyncResolve<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncReject(error: unknown) {
  return defer(() => Promise.reject(error));
}

export function mockObservable<T>(data: T) {
  return of(data);
}

export function mockPromise<T>(data: T) {
  return Promise.resolve(data);
}
