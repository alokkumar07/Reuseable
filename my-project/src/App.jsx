import Button from "./common/Button";

export default function App() {
  return (
   <div className="bg-white fixed top-0 left-0 w-full shadow-lg py-8 px-16 flex justify-between items-center">
    <h1 className="text-2xl font-bold">hello</h1>
    <div className="space-x-12">
      <a href="#">Home</a>
      <a href="#">Images</a>
      <a href="#">About</a>
      <a href="#">Download</a>
      <Button color="info" onDoubleClick={()=>alert()}>Register now</Button>
    </div>
   </div>
  );
}
