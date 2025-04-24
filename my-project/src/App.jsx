import { useState } from "react";
import Alert from "./common/Alert";
import Button from "./common/Button";

export default function App() {
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
    </div>
  );
}
