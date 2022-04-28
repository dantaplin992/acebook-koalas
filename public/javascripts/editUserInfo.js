document.addEventListener('DOMContentLoaded', () => {

  const editInfoButton = document.querySelector('#edit_info_button')
  const infoSection = document.querySelector('#info_section')
  const infoList = document.querySelector('#info_list')
  const infoMessage = document.querySelector('#info_message')
  const userId = document.getElementsByName("user_id")[0].content
  const socket = io()

  editInfoButton.addEventListener('click', (event) => {
    if (event.target.getAttribute('class') == 'edit_info_button') {
      const infoItems = document.querySelectorAll('.info_item')
      for (i = 0; i < infoItems.length; i++) {
        changeInfoMessage("")
        createInputFields(infoItems[i], event.target)
      }
      changeToSaveButton(event.target)
    } else {
      sendInfoandRevert()
      changeToEditButton(event.target)
    }
  })
  
  function changeToSaveButton(btn) {
    btn.innerText = "Save"
    btn.setAttribute('class', 'save_info_button')
  }

  function changeToEditButton(btn) {
    btn.innerText = "Edit Info"
    btn.setAttribute('class', 'edit_info_button')
  }

  function createInputFields(infoField, btn) {
    const userInfo = infoField.innerText
    infoField.remove()
    const inputContainer = document.createElement('div')
    inputContainer.setAttribute('id', `input_container_${i}`)
    const textInput = document.createElement('input')
    textInput.setAttribute('type', 'text')
    textInput.setAttribute('value', userInfo.split(': ')[1])
    const inputLabel = document.createElement('span')
    inputLabel.innerText = userInfo.split(': ')[0] + " "
    inputLabel.setAttribute('class', 'user_input_label')
    inputContainer.appendChild(inputLabel)
    inputContainer.appendChild(textInput)
    infoSection.insertBefore(inputContainer, btn)
  }

  function sendInfoandRevert() {
    const FirstNameInputContainer = document.querySelector('#input_container_0')
    const SurnameInputContainer = document.querySelector('#input_container_1')
    const EmailInputContainer = document.querySelector('#input_container_2')
    const newFirstName = FirstNameInputContainer.children[1].value
    const newSurname = SurnameInputContainer.children[1].value
    const newEmail = EmailInputContainer.children[1].value

    sendNewInfo(newFirstName, newSurname, newEmail)

    const firstNameInfoItem = document.createElement('li')
    firstNameInfoItem.setAttribute('class', 'info_item')
    const SurnameInfoItem = document.createElement('li')
    SurnameInfoItem.setAttribute('class', 'info_item')
    const EmailInfoItem = document.createElement('li')
    EmailInfoItem.setAttribute('class', 'info_item')
    firstNameInfoItem.innerText = `First name: ${newFirstName}`
    SurnameInfoItem.innerText = `Surname: ${newSurname}`
    EmailInfoItem.innerText = `E-mail: ${newEmail}`

    removeItems([FirstNameInputContainer, SurnameInputContainer, EmailInputContainer])
    appendChildren(infoList, [firstNameInfoItem, SurnameInfoItem, EmailInfoItem])
    changeInfoMessage("Info updated!")
  }

  function sendNewInfo(newFirstName, newSurname, newEmail) {
  
    console.log(`${newFirstName} ${newSurname} ${newEmail}`)
    socket.emit('updateUserInfo', { userId: userId, newFirstName: newFirstName, newSurname: newSurname, newEmail: newEmail})
  }

  function appendChildren(parent, children) {
    for (i = 0; i < children.length; i++) {
      parent.appendChild(children[i])
    }
  }

  function removeItems(items) {
    for (i = 0; i < items.length; i++) {
      items[i].remove()
    }
  }

  function changeInfoMessage(message) {
    infoMessage.innerText = message
  }

})