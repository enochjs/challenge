// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]


// ============= Your Code Here =============
type IsRepeatKey<T extends string, K extends string, Flag extends boolean = false> =
  T extends `${infer F}${infer Rest}`
    ? K extends F
      ? Flag extends true
        ? true
        : IsRepeatKey<Rest, K, true>
      : IsRepeatKey<Rest, K, Flag>
    : false

type FirstUniqueCharIndex<T extends string, S extends string = T, I extends number[] = []> =
  S extends `${infer F}${infer Rest}`
    ? IsRepeatKey<T, F> extends false
      ? I['length']
      : FirstUniqueCharIndex<T, Rest, [...I, 1]>
    : -1
