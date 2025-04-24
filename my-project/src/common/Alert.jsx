import "remixicon/fonts/remixicon.css";
import "animate.css";

const Alert = ({ children, type = "info", open = false, onClose }) => {
  if (type === "success" && open)
    return (
      <div className="relative bg-green-500 p-4 rounded shadow text-white font-medium  flex item-center gap-2 animate__animated animate__pulse">
        <i class="ri-checkbox-circle-fill text-2xl"></i>
        <label className="text-[17px]">{children}</label>
        <button className="absolute top-2 right-3" onClick={onClose}>
          <i class="ri-close-circle-fill"></i>
        </button>
      </div>
    );
  if (type === "error" && open)
    return (
      <div className=" relative bg-rose-500 p-4 rounded shadow text-white font-medium  flex item-center gap-2 animate__animated animate__pulse">
        <i class="ri-error-warning-fill text-2xl"></i>
        <label className="text-[17px]">{children}</label>
        <button className="absolute top-2 right-3" onClick={onClose}>
          <i class="ri-close-circle-fill"></i>
        </button>
      </div>
    );
  if (type === "info" && open)
    return (
      <div className="relative bg-violet-500 p-4 rounded shadow text-white font-medium  flex item-center gap-2 animate__animated animate__pulse">
        <i class="ri-pie-chart-fill text-2xl"></i>
        <label className="text-[17px]">{children}</label>
        <button className="absolute top-2 right-3" onClick={onClose}>
          <i class="ri-close-circle-fill"></i>
        </button>
      </div>
    );

  return null;
};

export default Alert;
