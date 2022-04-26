
document.addEventListener('DOMContentLoaded', () => {
  const acceptButtons = document.querySelectorAll('.accept_friend')
  const rejectButtons = document.querySelectorAll('.reject_friend')
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
    console.log(newFriend)
    // const friendsSection = document.querySelector('#friends_section')
    // const friendTextContainer = document.createElement('div')
    // friendTextContainer.setAttribute('class', 'post')
    // friendTextContainer.setAttribute('id', newFriend._id)
    // friendTextContainer
  })
})