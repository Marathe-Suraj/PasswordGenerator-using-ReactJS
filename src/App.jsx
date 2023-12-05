import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberAllowed) str += "0123456789";
    if (isCharAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isNumberAllowed, isCharAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberAllowed, isCharAllowed, passwordGenerator]);
  return (
    <div className="Card mx-auto px-4 py-3 my-8">
      <h1 className="text-white text-center my-5">Password Generator</h1>
      <div className="PasswordSection my-3">
        <div className="searchBox mb-4">
          <input
            type="text"
            value={password}
            className="rounded w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          ></input>
        </div>
        <div className="dvCopybtn">
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-700 CopyPasswordButton"
          >
            copy
          </button>
        </div>
      </div>
      <div className="flex text-sm gap-x-2 justify-center">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isNumberAllowed}
            id="numberInput"
            onChange={() => {
              setIsNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={isCharAllowed}
            id="characterInput"
            onChange={() => {
              setIsCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
