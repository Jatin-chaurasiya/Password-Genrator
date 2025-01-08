
import { useEffect } from 'react';
import { useState, useCallback } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed,setPassword]);
    
  //  useEffect(() =>{                      // also genrate password each component
  //   passwordGenerator()
  //  }, [length, numberAllowed, charAllowed,setPassword])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    });
  };

  const resetSettings = () => {
    setLength(8);
    setNumberAllowed(false);
    setCharAllowed(false);
    setPassword('');
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-1 mb-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="cursor-pointer"
            />
            <label>Length: {length}</label>
          </div>
        </div>
        <div className="flex items-center gap-x-2 mb-4">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
          />
          <label>Include Numbers</label>
        </div>
        <div className="flex items-center gap-x-2 mb-4">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
          />
          <label>Include Special Characters</label>
        </div>
        <div className="flex gap-x-4">
          <button
            onClick={passwordGenerator}
            className="w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Generate Password
          </button>
          <button
            onClick={resetSettings}
            className="w-full bg-red-600 text-white py-2 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
