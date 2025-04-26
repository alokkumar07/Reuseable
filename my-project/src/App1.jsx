import React, { useState } from "react";
import { Form, Input } from "./common/Form";
import Alert from "./common/Alert";

const App1 = () => {
  const model={
    open: false,
    type: "",
    message: "",
  }
  const [alert, setAlert] = useState(model);
  const formValue = (value, form) => {
    console.log(value);
    if (value.email === "alok@gmail.com" && value.password === "1234") {
      setAlert({
        open: true,
        type: "success",
        message: "Login Success",
      });
    } else {
      setAlert({
        open: true,
        type: "error",
        message: "Login Failed",
      });
    }
    form.reset();
  };
  return (
    <div className="w-6/12 mx-auto py-8">
      <h1>Reusable Form</h1>
      <Form vertical getvalue={formValue}>
        {/* <Input
          type="text"
          name="username"
          Required={true}
          placeholder="Username"
        /> */}
        <Input type="email" name="email" placeholder="Email" />
        <Input
          type="password"
          name="password"
          Required={true}
          placeholder="********"
        />
      </Form>
      <Alert
        open={alert.open}
        type={alert.type}
        onClose={()=>setAlert(model)}
      >
        {alert.message}
      </Alert>
    </div>
  );
};

export default App1;
