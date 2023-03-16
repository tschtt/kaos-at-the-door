/**
 * References
 * - https://javascript.plainenglish.io/working-with-the-dom-in-vanilla-js-apps-part-2-ebd9a8064f6c
 */

// database

const ravers = [
  { id: 0, nombre: 'Pedro Gomez', pronombre: 'el', entro: true },
  { id: 1, nombre: 'Ayelen Rodriguez', pronombre: 'ella', entro: true },
  { id: 2, nombre: 'Maitena Arrecho', pronombre: '', entro: false },
  { id: 3, nombre: 'Juan Santiago', pronombre: 'el/ella', entro: true },
  { id: 4, nombre: 'Juan Gomez', pronombre: 'elle', entro: true },
  { id: 5, nombre: 'Airel Parrilli', pronombre: '', entro: true },
]

// elements

const $results = document.querySelector('.results')
const $input = document.querySelector('.input')

// variables

let input

// creators

function create_result({ id, nombre, pronombre }) {
  let content = nombre + (pronombre && ` (${pronombre})`)
  return `
    <li>
      <button class="result" id="raver-${id}" data-id="${id}" data-nombre="${nombre}">
        ${content}
      </button>
    </li>
  `
}

function create_results(result) {
  return result.map(create_result).join('')
}

// filters

function filter_ravers(nombre) {
  return ravers.filter(raver => raver.nombre.toLowerCase().includes(nombre.toLowerCase()))
}

// validators

function validate_input() {
  if(!input) throw new Error('tenes que ingresar el nombre de la persona')
}

// events

function on_comprobante_click(event) {
  if(!input) return alert('tenes que ingresar el nombre de la persona')
  return alert(`${input} mostró comprobante!`)
}

function on_transferencia_click(event) {
  if(!input) return alert('tenes que ingresar el nombre de la persona')
  return alert(`${input} pagó por transferencia!`)
}

function on_efectivo_click(event) {
  if(!input) return alert('tenes que ingresar el nombre de la persona')
  return alert(`${input} pagó en puerta!`)
}

function on_raver_click(event) {
  const nombre = event.target.dataset.nombre
  return alert(`${nombre} entró!`)
}

function on_result_click(event) {
  if(event.target.id === 'comprobante') return on_comprobante_click(event)
  if(event.target.id === 'transferencia') return on_transferencia_click(event)
  if(event.target.id === 'efectivo') return on_efectivo_click(event)
  if(event.target.className === 'result') return on_raver_click(event)
}

function on_input(event) {
  input = event.target.value
  results = filter_ravers(input)
  results = create_results(results)
  $results.innerHTML = results
}

function on_init() {
  $results.innerHTML = create_results(ravers)
}

$input.addEventListener('input', on_input)
document.addEventListener('click', on_result_click)

on_init()