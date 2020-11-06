/* eslint-env mocha */

import { newStatus, clearAccumulator } from '../src/modules/calculator.js'
import assert from 'assert'

describe('calculator', () => {
  describe('newStatus', () => {
    it('returns a new status with the functions passed to it', async () => {
      assert.deepStrictEqual(await newStatus({ test: 'test' }), {
        acc: '',
        cmd: '',
        op: '',
        functions: {
          test: 'test'
        }
      })
    })
  })
  describe('clearAccumulator', () => {
    it('clears the accumulator', async () => {
      assert.strictEqual((await clearAccumulator({ acc: 'not clear' })).acc, '')
    })
    it('returns the original operand', async () => {
      assert.strictEqual((await clearAccumulator({ op: 'original' })).op, 'original')
    })
    it('returns the original command', async () => {
      assert.strictEqual((await clearAccumulator({ cmd: 'original' })).cmd, 'original')
    })
    it('returns the original functions', async () => {
      assert.strictEqual((await clearAccumulator({ functions: 'original' })).functions, 'original')
    })
  })
})
