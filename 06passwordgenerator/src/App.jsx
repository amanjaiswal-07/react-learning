import { useState , useCallback , useEffect , useRef} from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState("")

  const passwordRef = useRef(null)

  // const passwordGenerator = useCallback(() => {
  //   let pass = ""
  //   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  //   if(numberAllowed){
  //     str += "0123456789"
  //   }
  //   if(charAllowed){
  //     str += "!@#$%^&*-_+=[]{}~`"
  //   }
  //   for (let i = 1; i <= length; i++) {
  //     let char = Math.floor(Math.random() * str.length);
  //     pass += str.charAt(char)
  //   }
  //   setpassword(pass)
  // } , 
  // [length,numberAllowed,charAllowed,setpassword])
  const passwordGenerator = useCallback(() => {
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let numbers = "0123456789";
  let specials = "!@#$%^&*-_+=[]{}~`";

  let pool = letters;
  let pass = [];

  // force include
  if (numberAllowed) {
    pool += numbers;
    pass.push(numbers[Math.floor(Math.random() * numbers.length)]);
  }
  if (charAllowed) {
    pool += specials;
    pass.push(specials[Math.floor(Math.random() * specials.length)]);
  }

  // fill remaining
  while (pass.length < length) {
    pass.push(pool[Math.floor(Math.random() * pool.length)]);
  }

  // shuffle so forced chars aren't always at start
  for (let i = pass.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pass[i], pass[j]] = [pass[j], pass[i]];
  }

  setpassword(pass.join(""));
  }, [length, numberAllowed, charAllowed,setpassword]);


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    // <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    //   <h1 className='text-white text-center my-3'>Password generator</h1>
    //   <div className="flex shadow rounded-lg overflow-hidden mb-4">
    //     <input 
    //         type='text' 
    //         value={password}
    //         className="outline-none w-full py-1 px-3"
    //         placeholder="Password"
    //         readOnly
    //         ref={passwordRef}
    //     />
    //     <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
    //   </div>
    //   <div className='flex text-sm gap-x-2'>
    //     <div className='flex items-center gap-x-1'>
    //       <input
    //         type="range"
    //         min={8}
    //         max={100}
    //         value={length}
    //         className='cursor-pointer'
    //         onChange = {(e) => {setlength(Number(e.target.value))}}
    //       /><label>Length: {length}</label>
    //     </div>
    //     <div className="flex items-center gap-x-1">
    //       <input
    //         type="checkbox"
    //         checked={numberAllowed}
    //         id="numberInput"
    //         onChange={() => {setnumberAllowed((prev) => !prev);
    //       }}
    //       /><label htmlFor="numberInput">Numbers</label>
    //     </div>
    //     <div className="flex items-center gap-x-1">
    //       <input
    //           type="checkbox"
    //           checked={charAllowed}
    //           id="characterInput"
    //           onChange={() => {
    //               setcharAllowed((prev) => !prev )
    //           }}
    //       />
    //       <label htmlFor="characterInput">Characters</label>
    //     </div>
    //   </div>
    // </div>
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-2xl font-semibold text-white">Password Generator</h1>
            <p className="text-sm text-slate-400 mt-1">
              Choose length and options, then copy in one click.
            </p>
          </div>

          {/* Output */}
          <div className="flex items-stretch gap-2 rounded-xl border border-slate-800 bg-slate-950 p-2">
            <input
              type="text"
              value={password}
              className="w-full bg-transparent px-3 py-3 text-slate-100 outline-none selection:bg-orange-500/30"
              placeholder="Generated password"
              readOnly
              ref={passwordRef}
            />

            <button
              onClick={copyPasswordToClipboard}
              className="rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-black hover:bg-orange-400 active:scale-[0.98] transition"
            >
              Copy
            </button>
          </div>

          {/* Generate */}
          <button
            onClick={passwordGenerator}
            className="mt-3 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.99] transition"
          >
            Generate New Password
          </button>

          {/* Controls */}
          <div className="mt-6 space-y-5">
            {/* Length */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-200">Length</span>
                <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm text-slate-100">
                  {length}
                </span>
              </div>

              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="w-full cursor-pointer"
                onChange={(e) => setlength(Number(e.target.value))}
              />

              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>8</span>
                <span>100</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-200">Include Numbers</p>
                  <p className="text-xs text-slate-500">0-9</p>
                </div>

                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={numberAllowed}
                    onChange={() => setnumberAllowed((prev) => !prev)}
                  />
                  <div className="h-6 w-11 rounded-full bg-slate-700 peer-checked:bg-orange-500 transition"></div>
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white peer-checked:translate-x-5 transition"></div>
                </label>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-200">Include Special</p>
                  <p className="text-xs text-slate-500">! @ # $ ...</p>
                </div>

                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={charAllowed}
                    onChange={() => setcharAllowed((prev) => !prev)}
                  />
                  <div className="h-6 w-11 rounded-full bg-slate-700 peer-checked:bg-orange-500 transition"></div>
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white peer-checked:translate-x-5 transition"></div>
                </label>
              </div>
            </div>

            {/* Footer hint */}
            <p className="text-xs text-slate-500">
              Tip: Use 12+ length with both toggles for stronger passwords.
            </p>
          </div>
        </div>
      </div>
    );
}

export default App
