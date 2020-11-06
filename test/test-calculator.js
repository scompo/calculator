/* eslint-env mocha */

import { newStatus, clearAccumulator, error } from '../src/modules/calculator.js'
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
  describe('error', () => {
    it('returns the original accumulator', async () => {
      assert.strictEqual((await error({ acc: 'original' })).acc, 'original')
    })
    it('returns the error operand', async () => {
      assert.strictEqual((await error({ op: 'original' })).op, 'E')
    })
    it('returns the original command', async () => {
      assert.strictEqual((await error({ cmd: 'original' })).cmd, 'original')
    })
    it('returns the original functions', async () => {
      assert.strictEqual((await error({ functions: 'original' })).functions, 'original')
    })
  })
})
