var nodeLocation = "https://murmuring-anchorage-59527.herokuapp.com/";
var serverLocation = "https://murmuring-anchorage-59527.herokuapp.com/";

var cancella = function () {
  var assignmentId = document.getElementById("assignmentId");

  var url = nodeLocation + "cancella/" + assignmentId.value;
  console.log(assignmentId.value);
  fetch(url,{
    method: "delete",
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((response)=>{
    var newUrl = serverLocation + "index.html";
    document.location.href = newUrl;
  });
};
