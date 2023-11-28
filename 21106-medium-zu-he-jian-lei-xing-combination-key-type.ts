// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type CaseTypeOne = 'cmd ctrl' | 'cmd opt' | 'cmd fn' | 'ctrl opt' | 'ctrl fn' | 'opt fn'

type cases = [
  Expect<Equal<Combs, CaseTypeOne>>,
]


// ============= Your Code Here =============
type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']

type CombOne<T extends string[], S extends string, R = never> =
  T extends [infer F, ...infer Rest extends string[]]
    ? CombOne<Rest, S, R | `${S} ${F & string}`>
    : R

type CombAll<T extends string[]> =
  T extends [infer F extends string, ...infer Rest extends string[]]
    ? CombOne<Rest, F> | CombAll<Rest>
    : never

// 实现 Combs
type Combs = CombAll<ModifierKeys>
