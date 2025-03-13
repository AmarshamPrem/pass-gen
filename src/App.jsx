import { useState, useCallback, useRef, useEffect } from "react"

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const syms = "!@#$%^&*()_+";
    
    if (numbers) chars += nums;
    if (symbols) chars += syms;
    
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  }, [length, numbers, symbols]);

  useEffect(() => {
    generatePassword();
  }, [length, numbers, symbols, generatePassword]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center text-white">Password Generator</h2>

        <div className="flex mt-4 space-x-2">
          <input
            ref={passwordRef}
            value={password}
            type="text"
            className="w-full p-2 text-white bg-gray-700 rounded-md outline-none"
            placeholder="Generated Password"
            readOnly
          />
          <button 
            onClick={copyToClipboard}
            className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Copy
          </button>
        </div>

        <div className="mt-4">
          <label className="text-white">Length ({length})</label>
          <input 
            type="range" 
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min="6" 
            max="32" 
            className="w-full accent-green-500" 
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center space-x-2 text-white">
            <input 
              type="checkbox"
              checked={numbers}
              onChange={(e) => setNumbers(e.target.checked)}
              className="w-5 h-5 border-gray-500 rounded-md"
            />
            <span>Numbers</span>
          </label>
          <label className="flex items-center space-x-2 text-white">
            <input 
              type="checkbox"
              checked={symbols}
              onChange={(e) => setSymbols(e.target.checked)}
              className="w-5 h-5 border-gray-500 rounded-md"
            />
            <span>Symbols</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default App