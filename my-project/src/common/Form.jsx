export const Form = ({ children, vertical = true, getvalue = null }) => {
  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   const form = e.target;
  //   const fieldLength = form.children.length;
  //   console.log(fieldLength);
  //   const keys = Object.keys(form.elements);
  //   const names = keys.slice(fieldLength);
  //   console.log(names);
  //   const values = {};
  //   for (let name of names) {
  //     let value = form.elements[name].value;
  //     values[name] = value;
  //   }
  //   getvalue(values);
  // };
  const onSubmit = (e) => {
    e.preventDefault();
  
    const form = e.target;
    const values = {};
  
    for (let element of form.elements) {
      if (element.name) {
        values[element.name] = element.value;
      }
    }
  
    getvalue && getvalue(values,form);
  };
  
  return (
    <form
      onSubmit={onSubmit}
      className={`flex ${vertical ? "flex-col" : "flex-row"} gap-5 my-8`}
    >
      {children}
      <button className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200 ease-in-out">
        Submit
      </button>
    </form>
  );
};

export const Input = ({ ...rest }) => {
  return (
    <input className="border-2 border-gray-300 rounded-md p-2" {...rest} />
  );
};
