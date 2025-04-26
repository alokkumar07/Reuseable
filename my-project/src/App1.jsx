import React from 'react'
import { Form, Input } from './common/Form'

const App1 = () => {

  const formValue = (value)=>{
    console.log(value)
  }
  return (
    <div className='w-6/12 mx-auto py-8'>
    <h1>Reusable Form</h1>
      <Form
        vertical
        getvalue={formValue}
        >
        <Input
          type="text"
          name="username"
          Required={true}
          placeholder="Username"
        />
         <Input
          type="password"
          name="password"
          Required={true}
          placeholder="********"
        />
         <Input
          type="email"
          name="email"
          placeholder="Email"
        />
      </Form>
    </div>
  )
}

export default App1
