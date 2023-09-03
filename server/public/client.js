$(document).ready(onReady);
function onReady() {
console.log("Client side javascript works!");
$("#add_btn").on("click", addButtonFunction);
$('#taskDiv').on('click', '.delete-btn', deleteTaskButton);
$('#taskDiv').on('click', '.check', doneCheckMark);


  getTasks();
} //end of onready

function doneCheckMark(){
const row = $(this).closest('tr');
row.addClass('row-green');
// $('#taskTableBody').addClass('.row', function('background-color: green'));
}//end of done 
// TODO- working on a click event for the check mark to turn the background of the row green 



function addButtonFunction() {
  let taskInput = $("#taskText").val();
  console.log("this should be the task input value:", taskInput);

  let taskToSend = {
    task: taskInput,
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
  // $("#taskDiv").empty();

  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then(function (response) {
      const tasksToReceive = response;
      console.log("retrieved data", tasksToReceive);
      const taskTableBody = $("#taskDiv tbody");
      taskTableBody.empty();

      for (let tasks of tasksToReceive) {
        $("#taskTableBody").append(`
        <tr class="row">
        <td>${tasks.task}</td>
        <td>${tasks.status}</td>
        <td>
        <button class="check" 
        data-check-id=${tasks.status}>✅</button>
        </td>
        <td>
        <button class="delete-btn" 
        data-task-id=${tasks.id}>Delete</button>
        </tr>
                  `);
      }
    })
    .catch(function (error) {
      console.log("error in tasks get in get tasks function", error);
    });
} // end getTasks





function deleteTaskButton() {
  console.log("clicked the delete button");

  let idToDelete = $(this).data("task-id");
  console.log(this);

  console.log(idToDelete);

  $.ajax({
    method: "DELETE",
    url: `/tasks/${idToDelete}`, // We pass the id to the server in url as a url parameter
  })
    .then((results) => {
      console.log(
        "delete successful, this item no longer exists: ",
        idToDelete
      );
      getTasks();
    })
    .catch((err) => {
      alert("Error on delete, id:", idToDelete);
    });
} //end of delete task button 
