// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]


// ============= Your Code Here =============
type IsUpcase<S extends string> = Uppercase<S> extends Lowercase<S> ? false : S extends Uppercase<S> ? true : false

type KebabCase<S, Flag extends boolean = false> =
  S extends `${infer F}${infer Rest}`
    ? IsUpcase<F> extends true
      ? `${Flag extends true ? `-${Lowercase<F>}` : Lowercase<F>}${KebabCase<Rest, true>}`
      : `${F}${KebabCase<Rest, true>}`
    : ''
