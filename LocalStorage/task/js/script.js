// alert("hh")
window.onload = () => {
    fetchTasks();
  };
  const openDialog = () => {
    new Swal({
      html: `
     <div class="text-left space-y-4">
     <h1 class="text-xl font-semibold text-black">Add a new task</h1>
     <form onsubmit="createask(event)" class="space-y-4">
     <input id="task" class="px-3 w-full py-2 border border-gray-300 rounded" placeholder="Enter task name"/>
     <input id="date" type="date" class="px-3 w-full py-2 border border-gray-300 rounded"/>
     <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4">Add</button>
     </form>
     </div>
     `,
      showConfirmButton: false,
    });
  };
  
  const createask = (e) => {
    e.preventDefault();
    const taskInput = document.getElementById("task");
    const dateInput = document.getElementById("date");
    const task = taskInput.value.trim();
    const date = dateInput.value;
  
    const key = Date.now();
    const payload = JSON.stringify({
      task: task,
      date: date,
      status: "sheduled",
    });
    localStorage.setItem(key, payload);
    new Swal({
      title: "Task Created",
      text: `Your task  has been created.`,
      icon: "success",
      // showConfirmButton: true,
    }).then(() => {
      location.href = location.href;
    });
  };
  
  const fetchTasks = () => {
    const keys = Object.keys(localStorage);
    const uiConatainer = document.getElementById("taskList");
    var i = 1;
    for (var key of keys) {
      const data = JSON.parse(localStorage.getItem(key));
      const ui = `
        <tr class="border-b border-slate-200">
                      <td class="p-3.5">${i}</td>
                      <td class="text-gray-600">${data.task}</td>
                      <td class="text-gray-600">${moment(data.date).format(
                        "DD MMM YYYY"
                      )}</td>
                      <td class="text-gray-600">
                      <select class="border border-gray-300 rounded p-1" onchange="updateStatus(event,'${key}')">
                      <option value="sheduled" ${selectedStatus(
                        "sheduled",
                        data.status
                      )}>Sheduled</option>  
  
                      <option value="completed" ${selectedStatus(
                        "completed",
                        data.status
                      )}>Completed</option>
                      <option value="inprogress" ${selectedStatus(
                        "inprogress",
                        data.status
                      )}>In Progress</option>
                      <option value="cancelled" ${selectedStatus(
                        "cancelled",
                        data.status
                      )}>Cancelled</option>
                      <option value="postponed" ${selectedStatus(
                        "postponed",
                        data.status
                      )}>Postponed</option>
                      <option value="onhold" ${selectedStatus(
                        "onhold",
                        data.status
                      )}>On Hold</option>
  
                      <option value="notstarted" ${selectedStatus(
                        "notstarted"
                      )}>Not Started</option>
                      <option value="waiting" ${selectedStatus(
                        "waiting"
                      )}>Waiting</option>
  
                      </select>
                      </td>
                      <td>
                          <div class="flex items-center gap-3">
                              <button onclick="openDialogEdit('${data.task}','${key}' ,${data.date})" class="bg-green-600 cursor-pointer w-6 h-6 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-all duration-300 ease-in-out">
                                  <i class="ri-pencil-line "></i>
                              </button>
                              <button onclick="deleteTask('${key}')" class="bg-rose-600 cursor-pointer w-6 h-6 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-all duration-300 ease-in-out">
                                  <i class="ri-delete-bin-6-line "></i>
                              </button>
                          </div>
                      </td>
                  </tr>
                  `;
      uiConatainer.innerHTML += ui;
      i += 1;
    }
  };
  const deleteTask = (key) => {
      localStorage.removeItem(key);
      new Swal({
        title: "Task Deleted",
        text: `Your task has been deleted.`,
        icon: "success",
        showConfirmButton: true,
      }).then(() => {
        location.href = location.href;
      });
    };
  
    
  const openDialogEdit = (task, key) => {
    new Swal({
      html: `
         <div class="text-left space-y-4">
         <h1 class="text-xl font-semibold text-black">Update a task</h1>
         <form onsubmit="saveTasks(event,'${key}')">
         <input value='${task}'id="edited-task" class="px-3 w-full py-2 border border-gray-300 rounded"/>
         <button  id="edited-date" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">Update</button>
         </form>
         </div>
         `,
      showConfirmButton: false,
    });
  };
  const saveTasks = (e, key) => {
    e.preventDefault();
    const editedtaskInput = document.getElementById("edited-task");
    const editedDateInput = document.getElementById("edited-date");
    const editedtask = editedtaskInput.value.trim();
    const editedDate = editedDateInput.value;
    const payload = JSON.stringify({
      task: editedtask,
      date: editedDate,
      // status: "sheduled",
    });
    localStorage.setItem(key, payload);
    new Swal({
      title: "Task Updated",
      text: `Your task "${editedtask}" has been updated.`,
      icon: "success",
      // showConfirmButton: true,
    }).then(() => {
      location.href = location.href;
    });
  };
  
  const updateStatus = (e, key) => {
    const status = e.target.value;
    const payload = JSON.parse(localStorage.getItem(key));
    payload.status = status;
    localStorage.setItem(key, JSON.stringify(payload));
    new Swal({
      title: "Task Updated",
      // text: `Your task "${payload.task}" has been updated.`,
      icon: "success",
      // showConfirmButton: true,
    });
  };
  
  const selectedStatus = (value, status) => {
    if (value == status) {
      return "selected";
    } else {
      return "";
    }
  };
  
  
  const filterTasks = (input) => {
    const keyword = input.value.trim().toLowerCase();
    const keys = Object.keys(localStorage);
    const filteredData = [];
  
    for (var key of keys) {
      const data = JSON.parse(localStorage.getItem(key));
      if (data.task.toLowerCase().includes(keyword)) {
        filteredData.push({ key, ...data }); // keep key for later
      }
    }
  
    const uiContainer = document.getElementById("taskList");
    uiContainer.innerHTML = ""; // clear previous rows
  
    let i = 1;
    for (var item of filteredData) {
      const ui = `
              <tr class="border-b border-slate-200">
                            <td class="p-3.5">${i}</td>
                            <td class="text-gray-600">${item.task}</td>
                            <td class="text-gray-600">${moment(item.date).format(
                              "DD MMM YYYY"
                            )}</td>
                            <td class="text-gray-600">
                            <select class="border border-gray-300 rounded p-1" onchange="updateStatus(event,'${key}')">
                            <option value="sheduled" ${selectedStatus(
                              "sheduled",
                              item.status
                            )}>Sheduled</option>  
        
                            <option value="completed" ${selectedStatus(
                              "completed",
                              item.status
                            )}>Completed</option>
                            <option value="inprogress" ${selectedStatus(
                              "inprogress",
                              item.status
                            )}>In Progress</option>
                            <option value="cancelled" ${selectedStatus(
                              "cancelled",
                              item.status
                            )}>Cancelled</option>
                            <option value="postponed" ${selectedStatus(
                              "postponed",
                              item.status
                            )}>Postponed</option>
                            <option value="onhold" ${selectedStatus(
                              "onhold",
                              item.status
                            )}>On Hold</option>
        
                            <option value="notstarted" ${selectedStatus(
                              "notstarted",
                              item.status
                            )}>Not Started</option>
                            <option value="waiting" ${selectedStatus(
                              "waiting",
                              item.status
                            )}>Waiting</option>
        
                            </select>
                            </td>
                            <td>
                                <div class="flex items-center gap-3">
                                    <button onclick="openDialogEdit('${
                                      item.task
                                    }','${key}',${item.date})" class="bg-green-600 cursor-pointer w-6 h-6 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-all duration-300 ease-in-out">
                                        <i class="ri-pencil-line "></i>
                                    </button>
                                    <button onclick="deleteTask('${key}')" class="bg-rose-600 cursor-pointer w-6 h-6 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-all duration-300 ease-in-out">
                                        <i class="ri-delete-bin-6-line "></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        `;
      uiContainer.innerHTML += ui;
      i++;
    }
  
  };
  