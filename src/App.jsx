import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const copyToClipboard = () => {
    passRef.current?.select();
    buttonRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) {
      str += "0123456789";
    }
    if (charsAllowed) {
      str += "!@#$%^&*<>?/";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbersAllowed, charsAllowed]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charsAllowed, passwordGenerator]);
  return (
    <>
      <div className="flex justify-center items-center h-[35rem] w-full">
        <div className="w-[40rem] h-[20rem] bg-gray-400 text-black text-5xl mt-2 ">
          <h1 className="text-center mt-4">Password Generator</h1>
          <div className="mt-5">
            <input
              type="text"
              placeholder="Password"
              readOnly
              value={password}
              className="w-[30rem] mt-10 h-[3rem] text-2xl ml-6"
              ref={passRef}
            />
            <button
              className="bg-blue-900 text-2xl h-[4-rem] w-[6rem] text-center px-2 py-2 border-red-100 border-solid ml-2 text-white"
              onClick={copyToClipboard}
            >
              copy
            </button>
          </div>
          <div className="mt-6">
            <input
              type="range"
              min={0}
              max={100}
              className="w-[6rem] ml-8 cursor-pointer"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-xl"> length({length})</label>
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              className="ml-20"
              value={numbersAllowed}
              onChange={() => setNumbersAllowed((prev) => !prev)}
            />
            <label className="text-xl ml-2">Numbers</label>
            <input
              type="checkbox"
              defaultChecked={charsAllowed}
              className="ml-20"
              value={charsAllowed}
              onChange={() => setCharsAllowed((prev) => !prev)}
            />
            <label className="text-xl ml-2">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
