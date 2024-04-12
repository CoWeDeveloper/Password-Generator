import { useCallback, useEffect, useRef, useState } from 'react'
import "./index.css"

function App() {
const [length, setLength] = useState(6);
const [password, setPassword] = useState("");
const [allowNum, setAllowNum] = useState(false);
const [allowChar, setAllowChar] = useState(false);

const passRef = useRef<HTMLInputElement | null>(null);

const copyToClip = useCallback(() => {
  // passRef.current?.select();
  // passRef.current?.setSelectionRange(0, 999);
  window.navigator.clipboard.writeText(password)
}, [password])

const passwordGenerator = useCallback(()=>{
let pass = "";
let str : String = "ABCDEFGHIJKLMNOQRSTUVWXYZabcdefghijklmnoqrstuvwxyz"
if(allowNum) str += "12345678910";
if(allowChar) str += "!@#$%^&*()_[]\?/><+~{}";

for (let i = 0; i <= length; i++) {
  let charIndex = Math.floor(Math.random() * str.length + 1); // extracting the index of an element
  // console.log(charIndex);
  pass += str.charAt(charIndex);
}
setPassword(pass);

} ,[length, allowNum, allowChar, setPassword])

useEffect(()=>{
  passwordGenerator()
}, 
[allowChar, allowNum, passwordGenerator, length])


  return (
    <>
    <div className="bg-cover bg-no-repeat bg-center w-full h-screen " style={{backgroundImage: "url('./public/Image/bg-password.jpg')"}}>

     <div className='max-w-screen-sm mx-auto pt-20'  >
      <h1 className='text-center text-amber-600 font-extrabold drop-shadow-lg text-4xl '>Welcome to Your Password Generator</h1>
      <div className=' flex justify-center items-center bg-amber-400 hover:bg-amber-500 drop-shadow-xl box-shadow-lg border-amber-900 border-2   rounded-lg py-4 px-10'>

      <div className=''>
        <div className='w-64 border-blue-600 border-2 flex justify-center py-1 mx-auto rounded-md bg-white  '>
          <input type="text" readOnly className='rounded-lg border-none focus:outline-none' placeholder='password' value={password}/>
          <button onClick={copyToClip} className='  text-center bg-blue-400 rounded-xl  px-2 py-1'>Copy</button>
        </div>

        <div className='flex justify-center items-center py-5'>
          <div className='flex cursor-pointer mx-2'>
          <input type="range" 
          min={6}
          max={12}
          value={length}
          id="lengthInput"
          ref={passRef}
          onChange={(e) => {setLength(parseInt(e.target.value))}}
          />
          <label htmlFor='lengthInput' className='flex justify-center items-center mx-1 px-5'>Length({length})</label>  
          <button className='bg-gray-300 hover:bg-gray-400 hover:text-amber-300 rounded-lg py-1 px-5'
          onClick={()=> {passwordGenerator()}}>Change Password</button>
          </div>

          <div className='flex mx-2 '>
            <input 
            type="checkbox" 
            className='mx-1'
            onChange={()=>{setAllowNum((prev)=> !prev)}}
            id="numInput" />
            <label htmlFor='numInput'>Number</label>
          </div>

          <div className='flex '>
            <input  
            onChange={()=>{setAllowChar((prev)=> !prev)}}
            type="checkbox"
            id= "charInput"
            className='mx-1'/>
            <label htmlFor='charInput'>Character</label>
          </div>
        </div>

      </div>

    </div>
      </div>
     </div>
    </>
  )
}

export default App
