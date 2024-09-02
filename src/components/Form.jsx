import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Email from "./Email";

const Form = () => {
  const [inputName, setInputName] = useState("");
  const [inputIsValid, setInputIsValid] = useState(true);
  const [submittedName, setSubmittedName] = useState([]);

  const inputNameCHangeHandler = (e) => {
    setInputName(e.target.value);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (inputName.trim() === "") {
      setInputIsValid(false);
      return;
    }
    setInputIsValid(true);
    setSubmittedName((prevsName) => [...prevsName, inputName]);
    setInputName("");
  };
  const deleteNameHandler = (indexToDelete) => {
    setSubmittedName((prevNames) =>
      prevNames.filter((_, index) => index !== indexToDelete)
    );
  };
  const deleteAllListHandler = () => {
    setSubmittedName([]);
  };

  return (
    <div className="pt-20">
      <div className="w-[600px] bg-black/80 h-fit p-10 rounded-md shadow-lg z-30">
        <div>
          <form action="" className="" onSubmit={formSubmitHandler}>
            <div className="relative">
              <label
                htmlFor="name"
                className="pb-5 text-xl text-white font-bold "
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={inputName}
                onChange={inputNameCHangeHandler}
                name="name"
                className={`w-full mt-2 py-2 px-3 rounded-md focus:outline-none text-gray-400 ${
                  inputIsValid
                    ? "bg-gray-100 border-black"
                    : " border-red ring-red-600 ring-2"
                }`}
              />
              <FaRegCopy
                size={24}
                className={`absolute top-11  hover:text-gray-400 right-2 ${
                  inputIsValid ? "text-black " : "text-red-500"
                } `}
              />
            </div>
            {!inputIsValid && (
              <motion.p
                animate={{ x: 50 }}
                transition={{
                  type: "spring",
                  repeatDelay: Infinity,
                  damping: 10,
                  stiffness: 200,
                }}
                className="text-red-500 text-lg mt-2"
              >
                Name is required!
              </motion.p>
            )}
            <div className="flex justify-end mt-5">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.2 }}
                whileFocus={{ scale: 0.9 }}
                className="px-5 py-2 bg-gray-100 font-bold hover:text-gray-400 rounded-md"
              >
                Send
              </motion.button>
            </div>
            <Email />
          </form>
        </div>
        <div>
          <div className="flex justify-between mt-5">
            <h2 className="text-xl text-white font-bold">Submitted Names:</h2>
            <button
              onClick={() => deleteAllListHandler()}
              className="text-white"
            >
              <MdDelete size={24} />
            </button>
          </div>
          <div>
            <ul className="  text-lg text-white list-none">
              {submittedName.map((inputName, index) => (
                <li
                  key={index}
                  className="w-full py-1.5 flex justify-between px-3 bg-white rounded-md mt-2 text-center"
                >
                  <p className="text-xl font-semibold text-black">
                    {inputName}
                  </p>
                  <button
                    onClick={() => deleteNameHandler(index)}
                    className="text-red-500 border p-1.5 rounded-full bg-gray-400 hover:bg-gray-800"
                  >
                    <FaXmark />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
