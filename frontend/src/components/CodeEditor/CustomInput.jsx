import React from "react";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
        <textarea
        className="form"
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`standard input (stdin)`}
      ></textarea>
    </>
  );
};

export default CustomInput;