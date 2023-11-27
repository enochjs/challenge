// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]


// ============= Your Code Here =============

type IsRepeatKey<T extends any[], V extends any, Flag extends boolean = false> =
  T extends [infer F, ...infer Rest]
    ? F extends V
      ? Flag extends true
        ? true
        : IsRepeatKey<Rest, V, true>
      : IsRepeatKey<Rest, V, Flag>
    : false


type FindEles<T extends any[], O extends any[] = T, R extends any[] = []> =
  O extends [infer F, ...infer Rest]
    ? IsRepeatKey<T, F> extends true
      ? FindEles<T, Rest, R>
      : FindEles<T, Rest, [...R, F]>
    : R
