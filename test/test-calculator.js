/* eslint-env mocha */

import { newStatus } from '../src/modules/calculator.js'
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
})
