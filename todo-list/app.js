const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");

taskForm.addEventListener("submit", function (e) {

    e.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
        taskInput.focus();
    }

})


taskList.addEventListener('click', function (e) {
    
    console.log("button clicked:", e.target);
    if (e.target.classList.contains('delete-btn')) {
        console.log("delete button clicked");
        const taskItem = e.target.parentElement.parentElement;
        taskItem.remove();
    }

    else if (e.target.classList.contains('complete-btn')) {
        const taskItem = e.target.parentElement.parentElement;
        taskItem.classList.toggle('completed');
    }
})

function addTask(taskText) {

    const li = document.createElement("li");
    
    const taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = taskText;
    
    const taskButtonDiv = document.createElement("div");
    taskButtonDiv.className = 'task-buttons';

    const completebtn = document.createElement('button');
    completebtn.textContent = 'Complete';
    completebtn.className = 'complete-btn';

    const deletebtn = document.createElement('button');
    deletebtn.textContent = 'Delete';
    deletebtn.className = 'delete-btn';
    taskButtonDiv.appendChild(completebtn);
    taskButtonDiv.appendChild(deletebtn);

    li.appendChild(taskTextSpan);
    li.appendChild(taskButtonDiv);

    taskList.appendChild(li);
}