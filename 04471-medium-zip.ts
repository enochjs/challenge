// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]


// ============= Your Code Here =============
type Zip<T extends unknown[], U extends unknown[], R extends unknown[] = []> =
  T extends [infer T1, ...infer TRest]
    ? U extends [infer U1, ...infer URest]
      ? Zip<TRest, URest, [...R, [T1, U1]]>
      : R
    : R
