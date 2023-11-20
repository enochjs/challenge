// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]


// ============= Your Code Here =============

type Number2String<T extends number> = `${T}`
type String2Number<T extends string> = T extends `${infer R extends number}` ? R : never
type ReverseString<T extends string, R extends string = ''> = T extends `${infer F}${infer Rest}` ? ReverseString<Rest, `${F}${R}`> : R


type MinusMap = {
  '0': '9',
  '1': '0',
  '2': '1',
  '3': '2',
  '4': '3',
  '5': '4',
  '6': '5',
  '7': '6',
  '8': '7',
  '9': '8',
}

type ClearZero<S extends string> = S extends '' ? '0' : S extends `0${infer Rest}` ? ClearZero<Rest> : S

type MinusReverse<T extends string> = 
  T extends `${infer F extends keyof MinusMap}${infer Rest}`
    ? F extends '0'
      ? `9${MinusReverse<Rest>}`
      : `${MinusMap[F]}${Rest}`
    : ''

type MinusOne<T extends number> = T extends 0 ? -1 : String2Number<ClearZero<ReverseString<MinusReverse<ReverseString<Number2String<T>>>>>>
