const assert = require('node:assert')

import deepClone from '../index'

describe('test deep clone', () => {
  describe(`basic`, () => {
    describe(`basic`, () => {
      it('should clone a shallow object', () => {
        let input = { foo: 'bar' }
        let clone = deepClone(input)
        assert.deepEqual(input, clone)
        assert.ok(clone !== input)
        assert.ok(clone.foo === input.foo)
        delete input.foo
        assert.equal(clone.foo, 'bar')
      })

      it('should clone a non shallow object', () => {
        let input = { foo: { bar: 'ti' } }
        let clone = deepClone(input)
        assert.deepEqual(input, clone)
        assert.ok(clone !== input)
        assert.ok(clone.foo !== input.foo)
        assert.ok(clone.foo.bar === input.foo.bar)
        delete input.foo.bar
        assert.equal(clone.foo.bar, 'ti')
      })

      it('should clone an object with circular references', () => {
        var input = {
          foo: { b: { c: { d: {} } } },
          bar: {}
        } as any

        // circular ref 1
        input.foo.b.c.d = input
        // circular ref 2
        input.bar.b = input.foo.b

        let clone = deepClone(input)
        // circular ref 1
        assert.ok(clone === clone.foo.b.c.d)
        // circular ref 2
        assert.ok(clone.bar.b === clone.foo.b)
        // clone should point to a different object
        assert.ok(clone.foo.b !== input.foo.b)
        assert.ok(clone !== input)
        assert.deepEqual(clone, input)
      })

      it('clone typeof should yield same result as the original', () => {
        const input = { foo: 'bar' }
        const clone = deepClone(input)
        assert.equal(typeof clone, typeof input)
      })

      it('should clone the constructor', () => {
        const input = { foo: 'bar' }
        const clone = deepClone(input)
        assert.ok(input.constructor.name === clone.constructor.name)
      })
    })

    describe('object options', () => {
      it('should clone frozen object', () => {
        const input = { foo: 'bar' }
        Object.freeze(input)
        const clone = deepClone(input)
        assert.ok(Object.isFrozen(clone))
      })

      it('should clone sealed object', () => {
        const input = { foo: 'bar' }
        Object.seal(input)
        const clone = deepClone(input)
        assert.ok(Object.isSealed(clone))
      })

      it('should clone non extensible object', () => {
        let input = { foo: 'bar' }
        Object.preventExtensions(input)
        const clone = deepClone(input)
        assert.ok(Object.isExtensible(clone) === false)
      })
    })

  })
})