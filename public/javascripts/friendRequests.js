document.addEventListener('DOMContentLoaded', () => {
  const posts = document.querySelectorAll('.post')
  const socket = io()
  const userId = document.getElementsByName("user_id")[0].content
  const addFriendButtons = document.querySelectorAll('.add_friend_button')

  for (i = 0; i < addFriendButtons.length; i++) {
    console.log('Found friend button')
    addFriendButtons[i].addEventListener('click', (event) => {
      if (event.target.getAttribute('class') == 'add_friend_button') {
        const parent = event.target.parentElement
        const postId = parent.getAttribute('id')
        const authorId = parent.children[7].getAttribute('id')
        event.target.innerText = "Request Sent"
        event.target.setAttribute('class', 'request_badge')

        socket.emit('addFriend', { postId: postId, requestUser: userId })
      }
    })
  }

})
