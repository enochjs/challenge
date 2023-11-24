// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]


// ============= Your Code Here =============

type GreaterOne<X extends number, Y extends number, C extends number[] = []> =
  C['length'] extends X
    ? false
    : C['length'] extends Y
      ? true
      : GreaterOne<X, Y, [...C, 1]>

type Number2String<T extends number> = `${T}`
type String2Number<T extends string> = T extends `${infer R extends number}` ? R : never

type StringLength<T extends string, R extends number[] = []> = T extends `${infer F}${infer Rest}` ? StringLength<Rest, [...R, 1]> : R['length']

type CompareByEqualLength<X extends string, Y extends string> =
  X extends `${infer X1}${infer XRest}`
    ? Y extends `${infer Y1}${infer YRest}`
      ? X1 extends Y1
        ? CompareByEqualLength<XRest, YRest>
        : GreaterOne<String2Number<X1>, String2Number<Y1>> extends true
          ? true
          : false
      : false
    : false


type GreaterThan<T extends number, U extends number> =
  StringLength<Number2String<T>> extends StringLength<Number2String<U>>
    ? CompareByEqualLength<Number2String<T>, Number2String<U>>
    : GreaterOne<StringLength<Number2String<T>>, StringLength<Number2String<U>>>
