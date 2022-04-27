document.addEventListener('DOMContentLoaded', () => {
  // function sendData(form) {
  //   const XHR = new XMLHttpRequest();
  //   const formObj = { comment: form.children[0].value, post_id: form.children[1].value }
  //   console.log(formObj)
  //   XHR.addEventListener( "load", function() {
  //     console.log("data sent")
  //   });

  //   XHR.addEventListener( "error", function() {
  //     console.log("error");
  //   });

  //   XHR.open("POST", "/posts/comments/new", true);
  //   XHR.send( "param1=value1&param2=value2" )
  // }
  
  async function postData(url = '' , form) {
    const formObj = { comment: form.children[0].value, post_id: form.children[1].value }
    console.log(formObj)
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
    console.log(res.json())
    return res.json()
  }

  
  const forms = Array.from(document.getElementsByClassName("create-comment"));
  
  forms.forEach( (form) => {
    form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(event.target.comment)
    console.log("data sent")

    postData("posts/comments/new", event.target)
    .then(data => {
    console.log(data)
  })
    // sendData(event.target);
    })
  });
  
  

  // var button = document.getElementById("add-comment");
  //   button.addEventListener("click", function() {
  //   console.log('button clicked');
  //   var commentBoxValue = document.getElementById("comment-box").value;
  
  //   var li = document.createElement("li");
  //   var text = document.createTextNode(commentBoxValue);
  //   li.appendChild(text);
  //   document.getElementById("comment-list").appendChild(li);
  // })
 
})

