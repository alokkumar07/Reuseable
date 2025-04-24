import React from "react";

const Button = ({ children, color = "primary" ,...rest }) => {
  if (color === "primary")
    return (
      <button className="bg-violet-500 text-white px-4 py-2 rounded text-base" {...rest}>
        {children}
      </button>
    );
  if (color === "secondary")
    return (
      <button className="bg-blue-500 text-white px-4 py-2 rounded text-base" {...rest}>
        {children}
      </button>
    );
  if (color === "warning")
    return (
      <button className="bg-orange-600 text-white px-4 py-2 rounded text-base" {...rest}>
        {children}
      </button>
    );
  if (color === "error")
    return (
      <button className="bg-rose-600 text-white px-4 py-2 rounded text-base" {...rest}>
        {children}
      </button>
    );
  if (color === "info")
    return (
      <button className="bg-emerald-500 text-white px-4 py-2 rounded text-base" {...rest}>
        {children}
      </button>
    );
  if (color === "dark")
    return (
      <button className="bg-zinc-500 text-white px-4 py-2 rounded text-base" {...rest}>
        {children}
      </button>
    );
  return (
    <button {...rest}>
      {children}
    </button>
  );
};

export default Button;
