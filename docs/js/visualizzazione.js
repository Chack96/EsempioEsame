var nodeLocation = "https://murmuring-anchorage-59527.herokuapp.com/";
var serverLocation = "https://murmuring-anchorage-59527.herokuapp.com/";

function visualizza () {

  fetch(nodeLocation + "visualizza/", {
    method:"get",
    headers: {
        'Content-Type': 'application/json'
    },
    }).then ((response) => {
        var data= response.json();
        return data;
    }).then ((data) =>{
      console.log(data);

      var div = document.getElementById("visAssigment");

      for (var i = 0; i < data.length; i++) {
        var assignment = document.createElement('div');
        assignment.id = data[i].assignmentId;

        assignment.innerHTML = "AssignmentId: " + data[i].assignmentId + "; TaskId: " + data[i].taskId + "; WorkerId: " + data[i].workerId + "; AssignmentResult: " + data[i].assignmentResult;

        div.appendChild(assignment);
      }
    });
};
