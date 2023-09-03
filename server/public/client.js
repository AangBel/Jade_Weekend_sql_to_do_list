$(document).ready(onReady);
function onReady() {
console.log("Client side javascript works!");
$("#add_btn").on("click", addButtonFunction);
$('#taskDiv').on('click', '.delete-btn', deleteTaskButton);
$('#taskDiv').on('click', '.check', doneCheckMark);

// $('#taskDiv').on('click', '.check', markTaskAsComplete);

  getTasks();
} //end of onready

function doneCheckMark(){
const row = $(this).closest('tr');
row.addClass('row-green');

$.ajax({
  method: 'PUT',
  url: '/tasks',
})
.then(function (response) {
  console.log(`Task marked as complete:`);
  getTasks();
})
.catch(function (error) {
  console.error('Error marking task as complete:', error);
});
}//end of done 


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

        // TODO-- need to look more into this and not currently working - not currently changing
        // TODO display and its not currently connected to the add class change meaning that task status = true;
        // TODO and get the status to stay 
        // const statusText = tasks.status ? 'Yes' : 'No';
        
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


// function markTaskAsComplete() {
//   const taskId = $(this).data('check-id');

//   console.log(this);
//   console.log('this is the taskID under mark task as complete:', taskId);

//   $.ajax({
//       method: 'PUT',
//       url: '/tasks',
//   })
//   .then(function (response) {
//       console.log(`Task marked as complete: ${taskId}`);
//       getTasks();
//   })
//   .catch(function (error) {
//       console.error('Error marking task as complete:', error);
//   });
// }//end of mark task 





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
