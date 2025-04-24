import { useState } from "react";
import Alert from "./common/Alert";
import Button from "./common/Button";
import Modal from "./common/Modal";

export default function App() {
  const[modelOpen,setModelOpen]=useState(false)
  const [value, setValue] = useState("");
  const [alert, setAlert] = useState({
    type: null,
    open: false,
    message: "",
  });

  const handleInput = () => {
    if (value.length === 0) {
      setAlert({
        type: "error",
        open: true,
        message: "please Enter your name",
      });
    } else {
      setAlert({
        type: "success",
        open: true,
        message: "User name is Approved",
      });
    }
  };

  const closeAlert = () => {
    setAlert({
      type: null,
      open: false,
      message: "",
    });
  };
  return (
    <div className="w-6/12 mx-auto py-8 space-y-4">
      <h1 className="text-6xl font-bold">form validation</h1>
      <input
        className="border border-gray-300 p-3 rounded "
        placeholder="Enter your name"
        onChange={(e) => setValue(e.target.value)}
      />
      <Button color="warning" onClick={handleInput}>
        Submit
      </Button>
      <Alert type={alert.type} open={alert.open} onClose={closeAlert}>
        {alert.message}
      </Alert>
      <Button onClick={()=>setModelOpen(true)}>Open modal</Button>
      <Modal 
      open={modelOpen} 
      onClose={()=>setModelOpen(false)}
      Title="AlokKumar"
      desc={
        <form className="py-4 space-y-4">
        <input className="p-2 border border-gray-300 rounded w-full"
          placeholder="Full Name"
        />
        <input className="p-2 border border-gray-300 rounded w-full"
          placeholder="last Name"
        />
        <input className="p-2 border border-gray-300 rounded w-full"
          placeholder="Email"
        />
        <input className="p-2 border border-gray-300 rounded w-full"
          placeholder="Phone Number"
        />
        <Button>Submit</Button>
        </form>
      }
      />
    </div>
  );
}
