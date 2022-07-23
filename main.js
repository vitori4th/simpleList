const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('list:items')) || []
  },

  set(items) {
    localStorage.setItem('list:items', JSON.stringify(items))
  }
}

const Item = {
  all: Storage.get(),

  add(item) {
    Item.all.push(item)

    App.reload()
  },
  remove(index) {
    Item.all.splice(index, 1)

    App.reload()
  }
}

const DOM = {
  itemsContainer: document.querySelector('#list'),
  addItem(item, index) {
    const li = document.createElement('li')
    li.innerHTML = DOM.innerHTMLItem(item, index)
    li.dataset.index = index
    li.classList.add('list-item')

    DOM.itemsContainer.appendChild(li)
  },

  innerHTMLItem(item, index) {
    const html = ` 
    <span>
      <input type="checkbox"/>${item.name}
    </span>
    
    <i onclick="Item.remove(${index})" class="fa" title="Excluir item da lista">&#xf014;</i>
    `
    return html
  },

  clearItems() {
    DOM.itemsContainer.innerHTML = ''
  }
}

const Form = {
  name: document.querySelector('input#item'),
  getValue() {
    return {
      name: Form.name.value
    }
  },

  validateField() {
    const name = Form.getValue().name

    if (name.trim() === '') {
      Form.name.focus()

      throw new Error('Por favor, preencha o campo vazio!')
    }
  },

  clearField() {
    Form.name.value = ''
  },

  saveItem(item) {
    Item.add(item)
  },

  submit(event) {
    event.preventDefault()
    try {
      Form.validateField()
      const item = Form.getValue()
      Form.saveItem(item)
      Form.clearField()
    } catch (error) {
      alert(error.message)
    }
  }
}

const App = {
  init() {
    Item.all.forEach((item, index) => {
      DOM.addItem(item, index)
    })
    Storage.set(Item.all)
  },

  reload() {
    DOM.clearItems()
    App.init()
  }
}

App.init()
