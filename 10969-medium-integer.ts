// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.000000000>, 1>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
]


// ============= Your Code Here =============

type IsZero<S extends string> = S extends '' ? true : S extends `0${infer Rest}` ? IsZero<Rest> : false

type Integer<T extends number> =
  number extends T & number
    ? never
    : `${T}` extends `${infer V extends number}.${infer L}`
      ? IsZero<L> extends true
        ? V
        : never
      : T