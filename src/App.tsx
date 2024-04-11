import { useCallback, useState } from 'react'
import "./index.css"

function App() {
const [length, setLength] = useState("6");
const [password, setPassword] = useState("");
const [allowNum, setAllowNum] = useState(false);
const [allowChar, setAllowChar] = useState(false);

const passwordGenerator = useCallback(()=>{
let pass = "";
let str : String = "ABCDEFGHIJKLMNOQRSTUVWXYZ"
if(allowNum) str += "12345678910";
if(allowChar) str += "!@#$%^&*()_[]\?/><+~{}";
for (let i = 0; i <= Array.length; i++) {
  let charIndex = Math.floor(Math.random() * str.length + 1); // extracting the index of an element
}

} ,[length, allowNum, allowChar, setPassword])

  return (
    <>
    <div className="bg-cover bg-no-repeat bg-center w-full h-screen " style={{backgroundImage: "url('./public/Image/bg-password.jpg')"}}>

     <div className='max-w-screen-sm mx-auto pt-20'  >
      <div className=' flex justify-center items-center bg-gray-500 rounded-lg py-4 px-10'>

      <div className=''>
        <div className='flex items-center justify-center'>
          <input type="text" className='rounded-lg' />
          <button className='bg-blue-400 rounded-lg mx-2 pt-2 px-3 text-center'>Copy</button>
        </div>

        <div className='flex'>
          <div className='flex  mx-2'>
          <input type="range" />
          <p className='text-white mx-1'>Length(2)</p>  
          </div>

          <div className='flex mx-2 '>
            <input type="checkbox" className='mx-1' />
            <p>Number</p>
          </div>

          <div className='flex '>
            <input type="checkbox" className='mx-1'/>
            <p>Character</p>
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
