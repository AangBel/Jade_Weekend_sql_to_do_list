$(document).ready(onReady);
function onReady() {
  console.log("Client side javascript works!");
  $("#add_btn").on("click", addButtonFunction);
} //end of onready

function addButtonFunction() {
  let taskInput = $("#taskText").val();
  console.log("this should be the task input value:", taskInput);

  let taskToSend = {
    task: taskInput
  };
  console.log("this should be the task to send", taskToSend);

  $.ajax({
    method: "POST",
    url: "/tasks",
    data: taskToSend,
  })
    .then(function (response) {
      console.log(response);
    getTasks();
    })
    .catch(function (error) {
      console.log("error in tasks post under add button function", error);
    //   alert("Error. Please try again later.");
    });
} //end of addButtonFunction

function getTasks() {
  console.log("in getTasks");
  //TODO

  // $("#viewKoalas").empty();

  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then(function (response) {
      const tasksToReceive = response;
      console.log("retrieved data", tasksToReceive);
      for (let tasks of tasksToReceive) {
        $("#taskDiv").append(`
                  <tr>
                      <td>${tasks.task}</td>
                  </tr>
                  `);
      }
    })
    .catch(function (error) {
      console.log("error in tasks get in get tasks function", error);
    });
} // end getKoalas
