// alert("hh")
const openDialog = () => {  
   new Swal({
   html: `
   <div class="text-left space-y-4">
   <h1 class="text-xl font-semibold text-black">Add a new task</h1>
   <form>
   <input class="px-3 w-full py-2 border border-gray-300 rounded" placeholder="Enter task name"/>
   <button class="bg-blue-500 text-white px-4 py-2 rounded mt-4">Add</button>
   </form>
   </div>
   `,
  showConfirmButton: false,
   })
}