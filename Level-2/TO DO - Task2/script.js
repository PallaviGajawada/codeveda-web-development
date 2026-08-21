let tasks = JSON.parse(localStorage.getItem("taskflowTasks")) || [];

let currentFilter = "all";


function saveTasks() {

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );

}
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const remainingTasks = document.getElementById("remainingTasks");

const emptyState = document.getElementById("emptyState");



function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();

    taskInput.value = "";

    renderTasks();
}
function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // Apply selected filter

    if (currentFilter === "active") {

        filteredTasks = tasks.filter(function (task) {
            return !task.completed;
        });

    }

    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function (task) {
            return task.completed;
        });

    }


    filteredTasks.forEach(function (task) {

        const taskItem = document.createElement("li");

        taskItem.className = "task-item";

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        taskItem.innerHTML = `
            <input
                type="checkbox"
                class="task-checkbox"
                ${task.completed ? "checked" : ""}
            >

            <span class="task-text">
                ${task.text}
            </span>

            <div class="task-actions">

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>
        `;


        // Complete Task

        const checkbox =
            taskItem.querySelector(".task-checkbox");

        checkbox.addEventListener("change", function () {

            task.completed = checkbox.checked;

            saveTasks();

            renderTasks();

        });


        // Delete Task

        const deleteBtn =
            taskItem.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function () {

            tasks = tasks.filter(function (item) {

                return item.id !== task.id;

            });
            saveTasks();

            renderTasks();

        });


        // Edit Task

        const editBtn =
            taskItem.querySelector(".edit-btn");

        editBtn.addEventListener("click", function () {

            const taskText =
                taskItem.querySelector(".task-text");

            const input =
                document.createElement("input");

            input.type = "text";

            input.value = task.text;

            input.className = "edit-input";

            taskText.replaceWith(input);

            editBtn.textContent = "Save";

            input.focus();


            editBtn.onclick = function () {

                const updatedText =
                    input.value.trim();

                if (updatedText === "") {
                    return;
                }

                task.text = updatedText;

                saveTasks();

                renderTasks();

            };

        });


        taskList.appendChild(taskItem);

    });

    updateTaskCount();

    updateEmptyState();
}

function updateTaskCount() {

    const total = tasks.length;

    const remaining = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    totalTasks.textContent = total;

    remainingTasks.textContent =
        `${remaining} ${remaining === 1 ? "task" : "tasks"} remaining`;
}

function updateEmptyState() {

    if (tasks.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }
}

addTaskBtn.addEventListener("click", addTask);
const filterButtons =
    document.querySelectorAll(".filter-btn");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        currentFilter =
            button.dataset.filter;


        // Update active button

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        // Update task list

        renderTasks();

    });

});
const clearCompleted =
    document.getElementById("clearCompleted");

clearCompleted.addEventListener("click", function () {

    tasks = tasks.filter(function (task) {

        return !task.completed;

    });

    saveTasks();

    renderTasks();

});