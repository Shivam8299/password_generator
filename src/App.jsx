import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");


  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVQXYZacbdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "123456789";
    if (charAllowed) str += "@#$%^&*(){}";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);
  const copyPasswordToClip = useCallback(() => {
    alert("password copied")
    passwordRef.current?.select();
    passwordRef.current.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, passwordGenerator]);
  return (
    <div className="w-full max-w-xl mx-auto shadow-md rounded-xl px-3; py-8 text-orange-500 bg-gray-600 pl-8 pr-8 mt-96">
      <h1 className="text-center mb-6"><b>Password Generator</b> </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-3 ">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 py-3 rounded-l-xl"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClip}
          className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0" >
          <b>copy</b>
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex item-center gap-x-1">
          <input
            type="range"
            min={8}
            max={99}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label> <b>Length: {length}</b> </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput"> <b>Number</b></label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput"> <b>character</b></label>
        </div>
      </div>
    </div>
  );
}

export default App;
