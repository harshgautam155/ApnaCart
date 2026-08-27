import React, { forwardRef, useId } from "react";

function Input(
  { label, type = "text", placeholder = "", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${className} px-4 py-2 rounded-3xl bg-[#FFEDE7] border-[#FFDBCE]`}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
