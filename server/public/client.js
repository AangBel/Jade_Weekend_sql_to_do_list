$(document).ready(onReady);

function onReady() {
console.log("Client side javascript works!");
$("#add_btn").on("click", addButtonFunction);
$('#taskDiv').on('click', '.delete-btn', deleteTaskButton);
$('#taskDiv').on('click', '.check', doneCheckMark);

  getTasks();
} //end of onready

let currentStatus = $(this).data("check-id");
  console.log("this should be the current status", currentStatus);

function doneCheckMark() {
  // const row = $(this).closest('tr');
  // console.log(row);
  // row.addClass('row-green');

  const button = $(this);
  const row = button.closest('tr');

  // Add class to change the background color to green
  row.addClass('row-green');

  let taskID = $(this).data("task-id");
  console.log("this should be the taskID", taskID);

  // let taskToGreen = $(this).data().value;
  // console.log("this should be the task to make green", taskToGreen);
  // taskToGreen.addClass('row-green');

  let currentStatus = $(this).data("check-id");
  console.log("this should be the current status", currentStatus);

  const taskToCheck = {
    status: true, 
  };

  $.ajax({
    method: 'PUT',
    url: `/tasks/${taskID}`,
    data: taskToCheck,
  })
    .then(function (response) {
      // Update the task status in the DOM (if needed)
      // You can add code here to update the status in the DOM
      console.log(`Task marked as complete: ${taskID}`);
      getTasks(); // Refresh the task list
    })
    .catch(function (error) {
      console.error('Error marking task as complete:', error);
    });
}



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
      let taskInput = $("#taskText").val("");
      getTasks();
    })
    .catch(function (error) {
      console.log("error in tasks post under add button function", error);
    });
} //end of addButtonFunction




function getTasks() {
  console.log("in getTasks");

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

        const statusText = tasks.status ? 'Complete' : 'Incomplete'; 
        const rowClass = tasks.status ? 'row-green' : '';
        
        $("#taskTableBody").append(`
        <tr class="row ${rowClass}">
        <td>${tasks.task}</td>
        <td>${statusText}</td>
        <td>
        <button class="check" data-task-id="${tasks.id}" data-check-id="${tasks.status}">✅</button>
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

// TODO
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
    url: `/tasks/${idToDelete}`, 
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
