const store = (e)=>{
    e.preventDefault()
    const form = e.target
    const key = document.getElementById('key').value
    const value = document.getElementById('value').value
    localStorage.setItem(key, value)
    form.reset()
    new Swal({
        icon:"success",
        title:"New data stored successfully",
        // text:'New data stored successfully',
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timer: 10000,
        timerProgressBar: true,
  
        
    })

}