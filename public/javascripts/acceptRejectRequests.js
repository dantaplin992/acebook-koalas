
document.addEventListener('DOMContentLoaded', () => {
  const acceptButtons = document.querySelectorAll('.accept_friend')
  const rejectButtons = document.querySelectorAll('.reject_friend')
  const friendsSection = document.querySelector('#friends_section')
  const requestMessage = document.querySelector('#request_message')
  const userId = document.getElementsByName("user_id")[0].content
  const socket = io()

  for (i = 0; i < acceptButtons.length; i++) {
    console.log('found accept friend button')
    acceptButtons[i].addEventListener('click', (event) => {
      const request = event.target.parentElement
      const requesterId = request.children[1].innerText
      console.log(`accepting friend ${requesterId}`)

      socket.emit('acceptFriend', { myId: userId, friendId: requesterId })
    })
  }

  for (i = 0; i < rejectButtons.length; i++) {
    console.log('found reject friend button')
    rejectButtons[i].addEventListener('click', (event) => {
      const request = event.target.parentElement
      const requesterId = request.children[1].innerText
      console.log(`rejecting friend ${requesterId}`)

      socket.emit('rejectFriend', { myId: userId, friendId: requesterId })
    })
  }

  socket.on('acceptedFriend', (newFriend) => {
    console.log(`new friend: ${newFriend.firstName} ${newFriend.surname}`)
    
    const friendTextContainer = document.createElement('div')
    friendTextContainer.setAttribute('class', 'friend')
    friendTextContainer.innerText = `${newFriend.firstName} ${newFriend.surname}`
    friendsSection.appendChild(friendTextContainer)

    const request = document.querySelector(`[id="${newFriend._id}"]`)
    request.remove()
    requestMessage.setAttribute('class', 'request_message_accept')
    requestMessage.innerText = `Accepted Friend Request for ${newFriend.firstName} ${newFriend.surname}`
  })

  socket.on('rejectedFriend', (rejected) => {
    console.log(`Rejected friend: ${rejected}`)
    const requestToDelete = document.querySelector(`[id="${rejected._id}"]`)
    requestToDelete.remove()
    requestMessage.setAttribute('class', 'request_message_reject')
    requestMessage.innerText = `Removed Friend Request for ${rejected.firstName} ${rejected.surname}`
  })
})