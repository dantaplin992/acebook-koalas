document.addEventListener('DOMContentLoaded', () => {
  const posts = document.querySelectorAll('.post')
  for (i = 0; i < posts.length; i++) {
    console.log("Found Post")
    const addFriendButton = document.createElement('button')
    addFriendButton.setAttribute('class', 'add_friend_button')
    addFriendButton.innerText = "+ Add Friend"
    console.log(posts[i].firstElementChild)
    posts[i].insertBefore(addFriendButton, posts[i].children[1])
  }
})