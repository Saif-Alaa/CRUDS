let tasks = JSON.parse(localStorage.getItem('tasks')) || [];



// display tasks

function displayTasks()
{
  let tasklist = document.getElementById("taskList");
let filter = document.getElementById("filter").value;

tasklist.innerHTML ="";
document.getElementById("filter").addEventListener("change", displayTasks);

tasks.forEach((task, index) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "incomplete" && task.completed) return;
     
        let div = document.createElement("div");
        div.className = ' task d-flex justify-content-between align-items-center border rounded p-2 mb-2';
        div.innerHTML = `
            <div>
                <input type="checkbox" class="form-check-input me-2" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
                <strong>${task.title}</strong>
                <p class="mb-0">${task.description}</p>
            </div>
            <div>
                <button class="btn btn-warning btn-sm me-2" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        tasklist.appendChild(div);
    });
}

let editindex = null;


function addTask(){
    let title = document.getElementById("taskTitle").value;
        let btntitle = document.getElementById("taskTitle");

     let description = document.getElementById("taskDesc").value;
        let btndesk = document.getElementById("taskDesc");
 
let btn = document.getElementById("btn");
        btn.className ="btn btn-primary m-2 w-50";
if (title.trim() === ""){
    btntitle.classList.add("vibrate");

 setTimeout(() => {
    btntitle.classList.remove("vibrate")
 } , 3000);

return;
} 

if (description.trim() === ""){
    btndesk.classList.add("vibrate");

 setTimeout(() => {
    btndesk.classList.remove("vibrate")
 } , 3000);

return;
} 

if(editindex === null){
  tasks.push({title, description, completed: false});
} else {
  tasks[editindex].title = title;
  tasks[editindex].description = description;
  btn.textContent = "Add Task";
  editindex = null;
}

document.getElementById("taskTitle").value = "";
document.getElementById("taskDesc").value = "";
 
localStorage.setItem("tasks" ,JSON.stringify(tasks));
displayTasks();

}


// edit task

function editTask(e){

    editindex = e;

document.getElementById("taskTitle").value = tasks[e].title;
 document.getElementById("taskDesc").value = tasks[e].description;

        let btn = document.getElementById("btn");
        btn.className ="btn btn-warning m-2 w-50 ";
        btn.textContent = "Save Edit";

}


// delete task

function deleteTask(e)
{
    tasks.splice(e , 1);
    localStorage.setItem("tasks" , JSON.stringify(tasks));
    displayTasks();
}

// change status
function toggleComplete(e){
    tasks[e].completed = !tasks[e].completed;
    localStorage.setItem("tasks" , JSON.stringify(tasks));
}


displayTasks();
