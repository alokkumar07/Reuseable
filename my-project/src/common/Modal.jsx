import React from "react";
import "animate.css";

const Modal = ({ open = false ,onClose=null,Title="Modal Title",desc="desc"}) => {
  if (!open) return null;
  return (
    <div
      className="bg-black bg-opacity-90 fixed top-0 left-0  w-full h-full flex items-center justify-center
    animate__animated animate__fadeIn"
    >
      <div className=" relative bg-white rounded-lg p-6 w-[350px] animate__animated animate__zoomIn animate__faster">
      <h1 className="text-lg font-semibold">{Title}</h1>
      <div className="text-gray-500 text-justify">
      {desc}
      </div>
        <button onClick={onClose} className="absolute top-2 right-2">
            <i className="ri-close-circle-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default Modal;
