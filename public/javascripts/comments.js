document.addEventListener('DOMContentLoaded', () => {
  function sendData() {
    const XHR = new XMLHttpRequest();

    const FD = new FormData( form );
    XHR.addEventListener( "load", function() {
      console.log("data sent")
    });

    XHR.addEventListener( "error", function() {
      console.log("error");
    });

    XHR.open("POST", "/posts/comments/new");
    XHR.send( FD )
  }
    const form = document.getElementById("create-comment");
   
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("data sent")

      sendData();
    });
  

  var button = document.getElementById("add-comment");
    button.addEventListener("click", function() {
    console.log('button clicked');
    var commentBoxValue = document.getElementById("comment-box").value;
  
    var li = document.createElement("li");
    var text = document.createTextNode(commentBoxValue);
    li.appendChild(text);
    document.getElementById("comment-list").appendChild(li);
  })
 
})

