import { useCallback, useState, useEffect } from "react";
import "./App.css";

function App() {
  const [passLength, setPassLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`~!@#$%^&*()[]{}+=.,";

    for (let i = 1; i <= passLength; i++) {
      let randomIdx = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomIdx);
    }
    setPassword(pass);
  }, [passLength, numberAllowed, charAllowed, setPassword]);

  useEffect(()=>{
    passGen()
  },[passLength,numberAllowed,charAllowed,passGen])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-white bg-gray-700">
        <h1 className="text-4xl text-center text-white my-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg mb-4 overflow-hidden">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="outline-none w-full py-1 px-3 text-gray-600"
            readOnly
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={passLength}
            className='cursor-pointer' 
            onChange={(e)=>{setPassLength(e.target.value)}}
            />
            <label>Length: {passLength}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((previous) => !(previous))
            }}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={charAllowed}
            id='charInput'
            onChange={()=>{
              setcharAllowed((previous) => !(previous))
            }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
