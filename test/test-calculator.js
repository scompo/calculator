/* eslint-env mocha */

import {
  newStatus,
  clearAccumulator,
  error,
  removeLastNumber,
  toggleAccumulatorSign,
  storeOpAndClear,
  exec,
  concatAccumulator,
  unit,
  resetIfEqual,
  execExternalFunction,
  execCommand
} from '../src/modules/calculator.js'
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
  describe('concatAccumulator', () => {
    it('appends the thext to the accumulator returned', async () => {
      assert.strictEqual((await concatAccumulator({ acc: 'thi' }, 's')).acc, 'this')
    })
    it('returns the original operand', async () => {
      assert.strictEqual((await concatAccumulator({ op: 'original' }, '')).op, 'original')
    })
    it('returns the original command', async () => {
      assert.strictEqual((await concatAccumulator({ cmd: 'original' }, '')).cmd, 'original')
    })
    it('returns the original functions', async () => {
      assert.strictEqual((await concatAccumulator({ functions: 'original' }, '')).functions, 'original')
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
  describe('removeLastNumber', () => {
    it('deletes the last char when the accumulator has more than 1 char', async () => {
      assert.strictEqual((await removeLastNumber({ acc: 'text' })).acc, 'tex')
    })
    it('leaves the accumulator empty with 1 char', async () => {
      assert.strictEqual((await removeLastNumber({ acc: 'a' })).acc, '')
    })
    it('it does nothing to an empty accumulator', async () => {
      assert.strictEqual((await removeLastNumber({ acc: '' })).acc, '')
    })
    it('passing an null accumulator it returns an empty string as the new accumulator', async () => {
      assert.strictEqual((await removeLastNumber({ acc: null })).acc, '')
    })
    it('passing an undefined accumulator it returns an empty string as the new accumulator', async () => {
      assert.strictEqual((await removeLastNumber({ acc: undefined })).acc, '')
    })
    it('returns the original operand', async () => {
      assert.strictEqual((await removeLastNumber({ op: 'original' })).op, 'original')
    })
    it('returns the original command', async () => {
      assert.strictEqual((await removeLastNumber({ cmd: 'original' })).cmd, 'original')
    })
    it('returns the original functions', async () => {
      assert.strictEqual((await removeLastNumber({ functions: 'original' })).functions, 'original')
    })
  })
  describe('toggleAccumulatorSign', () => {
    it('changes a positive number to a negative one in the accumulator', async () => {
      assert.strictEqual((await toggleAccumulatorSign({ acc: '3333' })).acc, '-3333')
    })
    it('changes a negative number to a positive one in the accumulator', async () => {
      assert.strictEqual((await toggleAccumulatorSign({ acc: '-3' })).acc, '3')
    })
    it('returns a minus in the accumulator when given an empty accumulator', async () => {
      assert.strictEqual((await toggleAccumulatorSign({ acc: '' })).acc, '-')
    })
    it('returns a minus in the accumulator when given a null accumulator', async () => {
      assert.strictEqual((await toggleAccumulatorSign({ acc: null })).acc, '-')
    })
    it('returns a minus in the accumulator when given an undefined accumulator', async () => {
      assert.strictEqual((await toggleAccumulatorSign({ acc: undefined })).acc, '-')
    })
    it('returns an empty string in the accumulator when given an -', async () => {
      assert.strictEqual((await toggleAccumulatorSign({ acc: undefined })).acc, '-')
    })
    it('returns the original operand', async () => {
      assert.strictEqual((await toggleAccumulatorSign({ op: 'original' })).op, 'original')
    })
    it('returns the original command', async () => {
      assert.strictEqual((await toggleAccumulatorSign({ cmd: 'original' })).cmd, 'original')
    })
    it('returns the original functions', async () => {
      assert.strictEqual((await toggleAccumulatorSign({ functions: 'original' })).functions, 'original')
    })
  })
  describe('storeOpAndClear', () => {
    it('clears the accumulator', async () => {
      assert.strictEqual((await storeOpAndClear({ acc: 'acc value' })).acc, '')
    })
    it('moves the value of the accumulator into the operand', async () => {
      assert.strictEqual((await storeOpAndClear({ acc: 'old acc value' })).op, 'old acc value')
    })
    it('returns the original command', async () => {
      assert.strictEqual((await storeOpAndClear({ cmd: 'original' })).cmd, 'original')
    })
    it('returns the original functions', async () => {
      assert.strictEqual((await storeOpAndClear({ functions: 'original' })).functions, 'original')
    })
  })
  describe('exec', () => {
    it('can add', async () => {
      assert.strictEqual(
        (await exec({
          acc: '7',
          op: '3',
          cmd: '+',
          functions: 'original'
        })).acc,
        '10')
    })
    it('can subtract', async () => {
      assert.strictEqual(
        (await exec({
          acc: '7',
          op: '3',
          cmd: '-',
          functions: 'original'
        })).acc,
        '-4')
    })
    it('can multiply', async () => {
      assert.strictEqual(
        (await exec({
          acc: '7',
          op: '3',
          cmd: '*',
          functions: 'original'
        })).acc,
        '21')
    })
    it('can divide', async () => {
      assert.strictEqual(
        (await exec({
          acc: '5',
          op: '30',
          cmd: '/',
          functions: 'original'
        })).acc,
        '6')
    })
    it('sets command to =', async () => {
      assert.strictEqual(
        (await exec({
          acc: '1',
          op: '1',
          cmd: '-',
          functions: 'original'
        })).cmd,
        '=')
    })
    it('removes the current operand', async () => {
      assert.strictEqual(
        (await exec({
          acc: '6',
          op: '2',
          cmd: '-',
          functions: 'original'
        })).op,
        '')
    })
    it('can calculate the integger modulus', async () => {
      assert.strictEqual(
        (await exec({
          acc: '2',
          op: '7',
          cmd: '%',
          functions: 'original'
        })).acc,
        '1')
    })
    it('return an error value for an unknkown operation', async () => {
      assert.strictEqual(
        (await exec({
          acc: '7',
          op: '3',
          cmd: 'ff',
          functions: 'original'
        })).acc,
        'error')
    })
    it('returns the original functions', async () => {
      assert.strictEqual(
        (await exec({
          acc: '3',
          op: '3',
          cmd: '+',
          functions: 'original'
        })).functions,
        'original')
    })
  })
  describe('unit', () => {
    it('returns whatever is passed to it', async () => {
      assert.strictEqual((await unit('something')), 'something')
    })
  })
  describe('resetIfEqual', () => {
    context('when the command is =', () => {
      it('it returns a cleared command', async () => {
        assert.strictEqual((await resetIfEqual({ cmd: '=' })).cmd, '')
      })
      it('it returns a cleared operand', async () => {
        assert.strictEqual((await resetIfEqual({ cmd: '=', op: 'something' })).op, '')
      })
      it('it returns a cleared accumulator', async () => {
        assert.strictEqual((await resetIfEqual({ cmd: '=', acc: 'something' })).acc, '')
      })
      it('it returns the functions from the original status', async () => {
        assert.strictEqual((await resetIfEqual({ cmd: '=', functions: 'funcs' })).functions, 'funcs')
      })
    })
    context('when the command is not =', () => {
      it('it returns the status without changing it', async () => {
        assert.deepStrictEqual((await resetIfEqual({ cmd: '+', acc: '1', op: '2', functions: 'fs' })), { cmd: '+', acc: '1', op: '2', functions: 'fs' })
      })
    })
  })
  describe('execExternalFunction', () => {
    context('if the function to run exist in the functions of the status', () => {
      it('calls the function with the status as a parameter', done => {
        let called
        const status = {
          functions: {
            myFunc: async x => {
              called = x
            }
          }
        }
        execExternalFunction(status, 'myFunc')
          .then(() => {
            assert.deepStrictEqual(called, status)
          })
          .then(() => done())
          .catch(e => done(e))
      })
      it('returns the original status', done => {
        const status = {
          functions: {
            myFunc: async x => x
          }
        }
        execExternalFunction(status, 'myFunc')
          .then(res => {
            assert.deepStrictEqual(res, status)
          })
          .then(() => done())
          .catch(e => done(e))
      })
    })
    context('if the function to run does not exist in the functions of the status', () => {
      it('uses the unit function to just return the input and does nothing', done => {
        const status = { functions: {} }
        execExternalFunction(status, 'not existent')
          .then(res => {
            assert.deepStrictEqual(res, status)
          })
          .then(() => done())
          .catch(e => done(e))
      })
    })
  })
  describe('execCommand', () => {
    const tests = [{
      args: {
        status: { acc: '' },
        command: '1'
      },
      expected: '1'
    }, {
      args: {
        status: { acc: '' },
        command: '2'
      },
      expected: '2'
    }, {
      args: {
        status: { acc: '' },
        command: '3'
      },
      expected: '3'
    }, {
      args: {
        status: { acc: '' },
        command: '4'
      },
      expected: '4'
    }, {
      args: {
        status: { acc: '' },
        command: '5'
      },
      expected: '5'
    }, {
      args: {
        status: { acc: '' },
        command: '6'
      },
      expected: '6'
    }, {
      args: {
        status: { acc: '' },
        command: '7'
      },
      expected: '7'
    }, {
      args: {
        status: { acc: '' },
        command: '8'
      },
      expected: '8'
    }, {
      args: {
        status: { acc: '' },
        command: '9'
      },
      expected: '9'
    }, {
      args: {
        status: { acc: '' },
        command: '0'
      },
      expected: '0'
    }, {
      args: {
        status: { acc: '' },
        command: '.'
      },
      expected: '.'
    }]
    tests.forEach(test => {
      it('with the ' + test.args.command + ' command it concatenates it to the accumulator', async () => {
        assert.strictEqual((await execCommand(test.args.status, test.args.command)).acc, test.expected)
      })
    })
  })
})
