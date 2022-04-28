
document.addEventListener('DOMContentLoaded', () => {
  
  async function postData(url = '' , form) {
    const formObj = { comment: form.children[0].value, post_id: form.children[1].value }
    const res = await fetch(url, {
      method: "POST",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(formObj),
    })


    return res.json();

  }

  
  const forms = Array.from(document.getElementsByClassName("create-comment"));
  
  forms.forEach( (form) => {
    form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    let list = document.getElementById(`list_${event.target.post_id.value}`);
    let comment = document.createTextNode(event.target.comment.value);
    let user = document.createTextNode("You just commented: ");
    

    var container = document.createElement("div");
    container.classList.add("comment-container");

    var text = document.createElement("li");
    var author = document.createElement("li")
    author.classList.add("comment-author");
    text.classList.add("comment-text");
    
    container.appendChild(author);
    container.appendChild(text);
    author.appendChild(user);
    text.appendChild(comment);
    list.appendChild(container);


    postData("posts/comments/new", event.target)
    .then(data => {
    console.log(data);

  })

    })
  });
  

 
})

