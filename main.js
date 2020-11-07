import { newStatus, execCommand } from './modules/calculator.js'

let status = {}

async function getOutput (status) {
  return (status.op + ' ' + status.cmd + ' ' + status.acc).trim()
}

async function main () {
  const display = document.getElementById('out')
  const buttons = document.getElementsByTagName('button')
  return newStatus({
    copy: async function (status) {
      return navigator.clipboard.writeText(status.acc)
        .then(() => console.log('copied!'))
        .catch(e => console.error(e))
    }
  })
    .then(st => {
      status = st
      for (const button of buttons) {
        button.addEventListener('click', function (e) {
          const command = e.target.dataset.key
          execCommand(status, command)
            .then(res => {
              return getOutput(res)
                .then(output => {
                  display.innerHTML = output
                  status = res
                })
            })
        })
      }
      document.addEventListener('keydown', function (e) {
        let command = ''
        if ((e.ctrlKey && e.key === 'c') || (e.key === '@')) {
          command = 'copy'
        } else if (!e.ctrlKey && e.key === 'c') {
          command = 'clear'
        } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(e.key)) {
          command = e.key
        } else if (e.key === 'd') {
          command = 'delete'
        } else if (e.key === '+') {
          command = 'plus'
        } else if (e.key === '-') {
          command = 'minus'
        } else if (e.key === '*') {
          command = 'mul'
        } else if (e.key === '/') {
          command = 'div'
        } else if (e.key === '%') {
          command = 'div'
        } else if (['Enter', '='].includes(e.key)) {
          command = 'equal'
        }

        if (command) {
          execCommand(status, command)
            .then(res => {
              return getOutput(res)
                .then(output => {
                  display.innerHTML = output
                  status = res
                })
            })
        }
      })
    })
}

main()
  .catch(e => console.error(e))
