const formulario = document.getElementById('formulario')
const input = document.getElementById('input')
const listaTareas = document.getElementById('lista-tareas')
const templateTareas = document.getElementById('template').content
const fragment = document.createDocumentFragment()
let tareas = {}

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('tareas')){
    tareas = JSON.parse(localStorage.getItem('tareas'))
  }
  pintarTareas()
})

listaTareas.addEventListener('click', e => {
  btnAccion(e)
})



// console.log(Date.now());
// e.stopPropagation()//para detener la propagación del padre
formulario.addEventListener('submit', e => {
  e.preventDefault()
  // console.log(e.target[0].value)

  setTarea(e)
  //cuando el usuario ingresa su tarea se debe capturar y crear el objeto con esa info
})

  /*aqui hay que validar el formulario sino se estaría guardando información del input vacío.
  el set crea entonces el nuevo objeto con la captura del input para empujarlo al objeto tareas = {}
  Una vez que se captura el texto del input se debe limpar el input, vaciar.
  */ 

const setTarea = e => {
  //aqui hay que validar el formulario sino se estaría guardando información del input vacío.
  //el set crea entonces el nuevo objeto con la captura del input para empujarlo al objeto tareas = {}
  if(input.value.trim() === ''){
    alert('esta vacío')
    return 
  }
  //crear la tarea para despues empujarla a la const tareas{}
  const tarea = {
    id: Date.now(),
    texto: input.value,
    estado: false
  }
  tareas[tarea.id] = tarea
  // console.log(tareas);
  
  formulario.reset()
  input.focus()
  pintarTareas()//cuando ya se tiene el objeto creado y empujado en la variable tareas se debe mostrar o pintar
}

//para mostrar la tarea en objeto hay que usar el template del html
const pintarTareas = () => {

  localStorage.setItem('tareas', JSON.stringify(tareas))//guardo en el local las tareas y parseo el objeto con stringify a texto plano
  if(Object.values(tareas).length === 0) {
    listaTareas.innerHTML = `
    <div class="alert alert-dark text-center">
          Sin tareas pendientes 😍
      </div>
    `
    return
  }

  listaTareas.innerHTML = '' //para limpiar en cada vez que muestre las tareas
  Object.values(tareas).forEach(tarea => {
    const clone = templateTareas.cloneNode(true)
    clone.querySelector('p').textContent = tarea.texto

    if(tarea.estado){
      clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
      clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
      clone.querySelector('p').style.textDecoration = 'line-through'
    }

    clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
    clone.querySelectorAll('.fas')[1].dataset.id = tarea.id

    fragment.appendChild(clone)
  })
  listaTareas.appendChild(fragment)
}

const btnAccion = e => {
  if(e.target.classList.contains('fa-check-circle')){
    tareas[e.target.dataset.id].estado = true
    pintarTareas()
    console.log(tareas)
  }
  if(e.target.classList.contains('fa-minus-circle')){
    delete tareas[e.target.dataset.id]
    pintarTareas()
  }
  if(e.target.classList.contains('fa-undo-alt')){
    tareas[e.target.dataset.id].estado = false
    pintarTareas()
  }
  
  e.stopPropagation()
}
//interactuar con los botones de eliminar