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
        const authorId = parent.children[parent.children.length - 1].getAttribute('id')
        setRequestBadge(event.target)
        reformatButtons(authorId)
        socket.emit('addFriend', { postId: postId, requestUser: userId })
      }
    })
  }

  const reformatButtons = (authorId) => {
    for (i = 0; i < posts.length; i++) {
      const thisAuthor = posts[i].children[(posts[i].children.length - 1)].getAttribute('id')
      if (thisAuthor == authorId) {
        const badge = posts[i].children[1]
        if (badge.getAttribute('class') == 'add_friend_button') {
          setRequestBadge(badge)
        }
      }
    }
  }

  const setRequestBadge = (obj) => {
    obj.innerText = "Request Sent"
    obj.setAttribute('class', 'request_badge')
  }

})
