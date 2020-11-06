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
 */

/** @todo document this */
async function concatAccumulator (status, text) {
  return {
    acc: status.acc + text,
    op: status.op,
    cmd: status.cmd,
    functions: status.functions
  }
}

async function clearAccumulator (status) {
  return {
    acc: '',
    op: status.op,
    cmd: status.cmd,
    functions: status.functions
  }
}

async function getOutput (status) {
  return (status.op + ' ' + status.cmd + ' ' + status.acc).trim()
}

async function execExternalFunction (status, funcName) {
  const f = (status && status.functions && status.functions[funcName]) ? status.functions[funcName] : unit
  return f(status)
    .then(() => status)
}

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

async function storeOpAndClear (status, cmd) {
  return {
    acc: '',
    op: status.acc,
    cmd: status.cmd,
    functions: status.functions
  }
}

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

async function error (status) {
  return {
    acc: status.acc,
    cmd: status.cmd,
    op: 'E',
    functions: status.functions
  }
}

async function newStatus (functions) {
  return {
    acc: '',
    op: '',
    cmd: '',
    functions: functions
  }
}

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
    case '.':
      return resetIfEqual(status)
        .then(res => concatAccumulator(res, cmd))
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
  getOutput,
  clearAccumulator,
  error,
  removeLastNumber,
  toggleAccumulatorSign,
  storeOpAndClear,
  exec,
  concatAccumulator,
  unit,
  resetIfEqual,
  execExternalFunction
}
