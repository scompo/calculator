/**
 * @module calculator
 */

/**
 * Defines the state of the calculator.
 *
 * Every function returns the updated state.
 *
 * @typedef module:calculator.Status
 * @type {object}
 * @property {string} acc Accumulator value.
 * @property {string} op Operand value.
 * @property {string} cmd Command value.
 * @property {*} functions External functions.
 * @property {module:calculator.externalFunction} [functions.copy] A function that returns a promise to call on the 'copy' command.
 */

/**
 * Adds the text to the accumulator and returns the updated state.
 *
 * @function
 * @param {module:calculator.Status} status The current state of the calculator.
 * @param {string} text The text to add.
 *
 * @returns {module:calculator.Status} The updated state.
 */
async function concatAccumulator (status, text) {
  return {
    acc: status.acc + text,
    op: status.op,
    cmd: status.cmd,
    functions: status.functions
  }
}

/**
 * Clears the accumulator and returns the updated state.
 *
 * @param {module:calculator.Status} status The current state of the calculator.
 * @param {string} text The text to add.
 *
 * @returns {module:calculator.Status} The updated state.
 */
async function clearAccumulator (status) {
  return {
    acc: '',
    op: status.op,
    cmd: status.cmd,
    functions: status.functions
  }
}

/**
 * Execute an external function, if present and returns the current state.
 *
 * @param {module:calculator.Status} status The current state of the calculator.
 *
 * @returns {module:calculator.Status} The current state.
 */
function execExternalFunction (status, funcName) {
  const f = (status && status.functions && status.functions[funcName]) ? status.functions[funcName] : unit
  return f(status)
    .then(() => status)
}

/**
 * Returns the status in input.
 *
 * @param {module:calculator.Status} status The current state of the calculator.
 *
 * @returns {module:calculator.Status} The same state given.
 */
async function unit (status) {
  return status
}

async function execFun (cmd, op1, op2) {
  switch (cmd) {
    case '+': return parseFloat(op1) + parseFloat(op2)
    case '-': return parseFloat(op1) - parseFloat(op2)
    case '*': return parseFloat(op1) * parseFloat(op2)
    case '/': return parseFloat(op1) / parseFloat(op2)
    case '%': return parseFloat(op1) % parseFloat(op2)
    default: return 'error'
  }
}

/**
 * Moves the current accumulator value in operand, clears the accumulator, stores the command in cmd and returns the updated state.
 *
 * @param {module:calculator.Status} status The current state of the calculator.
 * @param {string} text Command to store.
 *
 * @returns {module:calculator.Status} The updated state.
 */
async function storeOpAndClear (status, cmd) {
  return {
    acc: '',
    op: status.acc,
    cmd: cmd,
    functions: status.functions
  }
}

/**
 * Execute the current status and returns the updated status.
 *
 * @param {module:calculator.Status} status The current state of the calculator.
 *
 * @returns {module:calculator.Status} The updated state.
 */
async function exec (status) {
  return execFun(status.cmd, status.op, status.acc)
    .then(res => {
      return {
        acc: '' + res,
        cmd: '=',
        op: '',
        functions: status.functions
      }
    })
}

/**
 * Sets the operand to 'E' and returns the updated state.
 *
 * @param {module:calculator.Status} status The current state of the calculator.
 * @param {string} text The text to add.
 *
 * @returns {module:calculator.Status} The updated state.
 */
async function error (status) {
  return {
    acc: status.acc,
    cmd: status.cmd,
    op: 'E',
    functions: status.functions
  }
}

/**
 * An external function to call on events.
 *
 * @async
 * @callback module:calculator.externalFunction
 * @param {module:calculator.Status} status The current status.
 */

/**
 * Removes the last number from the accumulator and returns the updated state.
 *
 * @param {*} functions An object of functions to call back.
 * @param {module:calculator.externalFunction} functions.copy A function that returns a promise to call on the 'copy' command.
 *
 * @returns {module:calculator.Status} The updated state.
 */
async function newStatus (functions) {
  return {
    acc: '',
    op: '',
    cmd: '',
    functions: functions
  }
}

/**
 * Clears the status if the command is "=" and returns the updated state.
 *
 * @param {module:calculator.Status} status The current state of the calculator.
 *
 * @returns {module:calculator.Status} The updated state.
 */
async function resetIfEqual (status) {
  if (status.cmd === '=') {
    return {
      cmd: '',
      op: '',
      acc: '',
      functions: status.functions
    }
  } else {
    return status
  }
}

/**
 * Changes the sign of the accumulator and returns the updated state.
 *
 * @param {module:calculator.Status} status The current state of the calculator.
 *
 * @returns {module:calculator.Status} The updated state.
 */
async function toggleAccumulatorSign (status) {
  const acc = status.acc || ''
  if (acc.startsWith('-')) {
    return {
      acc: acc.replace('-', ''),
      op: status.op,
      cmd: status.cmd,
      functions: status.functions
    }
  } else {
    return {
      acc: '-' + acc,
      op: status.op,
      cmd: status.cmd,
      functions: status.functions
    }
  }
}

/**
 * Removes the last number from the accumulator and returns the updated state.
 *
 * @param {module:calculator.Status} status The current state of the calculator.
 *
 * @returns {module:calculator.Status} The updated state.
 */
async function removeLastNumber (status) {
  return {
    acc: ((status.acc !== null && status.acc !== undefined) ? status.acc.slice(0, -1) : ''),
    cmd: status.cmd,
    op: status.op,
    functions: status.functions
  }
}

/**
 * Executes a command.
 *
 * @param {module:calculator.Status} status The current state of the calculator.
 * @param {module:calculator.Command} cmd The command to execute ("0" to "9", ".", "plus", "minus", "div", "mul", "mod", "equal", "copy", "delete", "clear").
 *
 * @returns {module:calculator.Status} The updated state.
 */
async function execCommand (status, cmd) {
  switch (cmd) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
      return resetIfEqual(status)
        .then(res => concatAccumulator(res, cmd))
    case '.':
      if (status.acc.includes('.')) {
        return unit(status)
      } else {
        return resetIfEqual(status)
          .then(res => concatAccumulator(res, cmd))
      }
    case 'clear':
      if (status.acc.length) {
        return clearAccumulator(status)
      } else {
        return newStatus(status.functions)
      }
    case 'plus':
      return storeOpAndClear(status, '+')
    case 'minus':
      if (status.acc !== '') {
        return storeOpAndClear(status, '-')
      } else {
        return toggleAccumulatorSign(status)
      }
    case 'mul':
      return storeOpAndClear(status, '*')
    case 'div':
      return storeOpAndClear(status, '/')
    case 'mod':
      return storeOpAndClear(status, '%')
    case 'equal':
      if (status.cmd === '' || status.cmd === 'E' || status.cmd === '=') {
        return unit(status)
      } else {
        return exec(status)
      }
    case 'copy':
      return execExternalFunction(status, 'copy')
    case 'delete':
      return removeLastNumber(status)
    default:
      return error(status)
  }
}

export {
  newStatus,
  execCommand,
  clearAccumulator,
  concatAccumulator,
  error,
  removeLastNumber,
  toggleAccumulatorSign,
  storeOpAndClear,
  exec,
  unit,
  resetIfEqual,
  execExternalFunction
}
