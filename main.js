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
    li.setAttribute('draggable', 'true')
    li.innerHTML = DOM.innerHTMLItem(item, index)
    li.dataset.index = index

    DOM.itemsContainer.appendChild(li)
  },

  innerHTMLItem(item, index) {
    const html = ` 
    <label class="check"> <input type="checkbox" /> <span></span></label>${item.name}<i onclick="Item.remove(${index})" class="fa" >&#xf014;</i>
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
      throw new Error('Por favor, digite um item para inserir')
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
      Form.saveItem(Form.getValue())
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

      Storage.set(Item.all)
    })
  },
  reload() {
    DOM.clearItems()
    App.init()
  }
}
App.init()
