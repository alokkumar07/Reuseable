// Initialize tasks when page loads
window.onload = () => fetchTasks();

// Open dialog to add a new task
const openDialog = () => {
  new Swal({
    html: `
      <div class="text-left space-y-4">
        <h1 class="text-xl font-semibold text-black">Add New Task</h1>
        <form onsubmit="createTask(event)">
          <input id="task" class="px-3 w-full py-2 border border-gray-300 rounded" placeholder="Task name" required>
          <input id="date" type="date" class="px-3 w-full py-2 border border-gray-300 rounded mt-2" required>
          <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">Add Task</button>
        </form>
      </div>
    `,
    showConfirmButton: false,
  });
};

// Create a new task
const createTask = (e) => {
  e.preventDefault();
  const task = document.getElementById("task").value.trim();
  const date = document.getElementById("date").value;

  if (!task || !date) {
    alert("Task name and date are required!");
    return;
  }

  const key = Date.now().toString();
  const payload = { task, date, status: "scheduled" };
  localStorage.setItem(key, JSON.stringify(payload));

  Swal.fire({
    title: "Task Added!",
    text: `"${task}" has been created.`,
    icon: "success",
  }).then(() => location.reload());
};

// Fetch all tasks from localStorage
const fetchTasks = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear existing tasks

  const keys = Object.keys(localStorage);
  if (keys.length === 0) {
    taskList.innerHTML = `<tr><td colspan="5" class="text-center py-4">No tasks found.</td></tr>`;
    return;
  }

  keys.forEach((key, index) => {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      const formattedDate = data.date && moment(data.date).isValid() 
        ? moment(data.date).format("DD MMM YYYY") 
        : "No date";

      taskList.innerHTML += `
        <tr class="border-b border-slate-200">
          <td class="p-3.5">${index + 1}</td>
          <td class="text-gray-600">${data.task}</td>
          <td class="text-gray-600">${formattedDate}</td>
          <td class="text-gray-600">
            <select class="border border-gray-300 rounded p-1" onchange="updateStatus(event, '${key}')">
              <option value="scheduled" ${data.status === "scheduled" ? "selected" : ""}>Scheduled</option>
              <option value="completed" ${data.status === "completed" ? "selected" : ""}>Completed</option>
              <option value="in-progress" ${data.status === "in-progress" ? "selected" : ""}>In Progress</option>
              <option value="cancelled" ${data.status === "cancelled" ? "selected" : ""}>Cancelled</option>
              <option value="Postponed" ${data.status === "Postponed" ? "selected" : ""}>Postponed</option>
              <option value="On Hold" ${data.status === "On Hold" ? "selected" : ""}>On Hold</option>
              <option value="Not Started" ${data.status === "Not Started" ? "selected" : ""}>Not Started</option>
              <option value="Waiting" ${data.status === "Waiting" ? "selected" : ""}>Waiting</option>
            </select>
          </td>
          <td>
            <div class="flex gap-2">
              <button onclick="openEditDialog('${key}')" class="bg-blue-500 text-white p-1 rounded">
                <i class="ri-pencil-line"></i>
              </button>
              <button onclick="deleteTask('${key}')" class="bg-red-500 text-white p-1 rounded">
                <i class="ri-delete-bin-line"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    } catch (e) {
      console.error("Error loading task:", e);
    }
  });
};

// Open edit dialog
const openEditDialog = (key) => {
  const taskData = JSON.parse(localStorage.getItem(key));
  const safeDate = taskData.date && moment(taskData.date).isValid()
    ? moment(taskData.date).format("YYYY-MM-DD")
    : "";

  new Swal({
    html: `
      <div class="text-left space-y-4">
        <h1 class="text-xl font-semibold text-black">Edit Task</h1>
        <form onsubmit="updateTask(event, '${key}')">
          <input value="${taskData.task}" id="edit-task" class="px-3 w-full py-2 border border-gray-300 rounded" required>
          <input type="date" value="${safeDate}" id="edit-date" class="px-3 w-full py-2 border border-gray-300 rounded mt-2" required>
          <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">Update</button>
        </form>
      </div>
    `,
    showConfirmButton: false,
  });
};

// Update task
const updateTask = (e, key) => {
  e.preventDefault();
  const task = document.getElementById("edit-task").value.trim();
  const date = document.getElementById("edit-date").value;

  if (!task || !date) {
    alert("Task name and date are required!");
    return;
  }

  const payload = { task, date, status: JSON.parse(localStorage.getItem(key)).status };
  localStorage.setItem(key, JSON.stringify(payload));

  Swal.fire({
    title: "Task Updated!",
    text: `"${task}" has been updated.`,
    icon: "success",
  }).then(() => location.reload());
};

// Delete task
const deleteTask = (key) => {
  Swal.fire({
    title: "Delete Task?",
    text: "This cannot be undone!",
    icon: "warning",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem(key);
      Swal.fire("Deleted!", "Task has been removed.", "success").then(() => location.reload());
    }
  });
};

// Update task status
const updateStatus = (e, key) => {
  const status = e.target.value;
  const taskData = JSON.parse(localStorage.getItem(key));
  taskData.status = status;
  localStorage.setItem(key, JSON.stringify(taskData));
};

// Filter tasks by search term
const filterTasks = (input) => {
  const keyword = input.value.trim().toLowerCase();
  const rows = document.querySelectorAll("#taskList tr");

  rows.forEach((row) => {
    const taskText = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
    row.style.display = taskText.includes(keyword) ? "" : "none";
  });
};