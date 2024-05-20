import { useCallback, useEffect, useRef, useState } from 'react'
import "./index.css"

function App() {

const [length, setLength] = useState(6);
const [password, setPassword] = useState("");

const passRef = useRef<HTMLInputElement | null>(null);

const copyToClip = useCallback(() => {
  passRef.current?.select();
  passRef.current?.setSelectionRange(0, 999);
  window.navigator.clipboard.writeText(password)
}, [password]);


const [checkboxes, setCheckboxes] = useState([
  { id: 'numInput', label: 'Number', state: false, },
  { id: 'charInput', label: 'Character', state: false, },
  { id: 'smallInput', label: 'Small Letter', state: true, },
  { id: 'capitalInput', label: 'Capital Letter', state: false },
]);

const passwordGenerator = useCallback(()=>{

let pass = "";
let str : string = ""

checkboxes.forEach((checkbox) => {
  if (checkbox.id === 'numInput' && checkbox.state) str += '1234567890';
  if (checkbox.id === 'charInput' && checkbox.state) str += '!@#$%^&*()_[]?/><+~{}';
  if (checkbox.id === 'smallInput' && checkbox.state) str += 'abcdefghijklmnopqrstuvwxyz';
  if (checkbox.id === 'capitalInput' && checkbox.state) str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
});

for (let i = 0; i <= length; i++) {
  let charIndex = Math.floor(Math.random() * str.length + 1); // extracting the index of an element
  pass += str.charAt(charIndex);
};

setPassword(pass);

}, [ length, checkboxes, setPassword]);

useEffect(()=>{
  passwordGenerator()
}, 
[ checkboxes, passwordGenerator, length])


const handleInputChange = (id: string) => {

  setCheckboxes((prevCheckboxes) =>{

    const newCheckedboxes =  prevCheckboxes.map((checkbox) =>
      checkbox.id === id ? { ...checkbox, state: !checkbox.state }  : checkbox
  )
  const countChecked = newCheckedboxes.filter( (checkboxe) =>  checkboxe.state ).length 
  console.log(countChecked)
  if (countChecked === 0){
    return prevCheckboxes;  
  }
  return newCheckedboxes;  
}
);


}
  return (
    <>
    <div className="bg-cover bg-no-repeat bg-center w-full h-screen " style={{backgroundImage: "url('./public/Image/bg-password.jpg')"}}>

     <div className='max-w-screen-sm  mx-auto pt-20 relative'  >
      <div className=''>

      <h1 className='text-center font-outfit text-amber-600 font-extrabold drop-shadow-lg text-4xl '>Welcome to Your Password Generator</h1>
      <div className=' flex justify-center items-center mt-5 bg-amber-400 hover:bg-amber-500 drop-shadow-xl box-shadow-lg border-amber-900 border-2   rounded-lg py-4 px-10'>

      <div className='relative w-auto'>
        <div className='w-auto border-blue-600  border-2 flex justify-center lg:flex-row md:flex-row sm:flex-row flex-col   py-1 px-2 mx-auto rounded-md bg-white  '>
          <input type="text" 
          readOnly className=' rounded-lg  border-none focus:outline-none w-full sm:text-left text-center py-2 md:py-0' 
          placeholder='password' 
          value={password}
          ref={passRef}
          />
          <button onClick={copyToClip} className='text-center bg-blue-400 my-2 md:my-0 hover:bg-blue-600 hover:text-amber-300 mx-2 transition-all ease-in-out duration-300 active:bg-blue-400 rounded-xl  px-2 py-1'>Copy</button>
          <button className='bg-gray-300 font-outfit hover:bg-gray-400 active:bg-gray-300 hover:text-amber-300 transition-all ease-in-out duration-300 rounded-lg py-1 px-5'
          onClick={()=> {passwordGenerator()}}>Change Password</button>
        </div>

        <div className='md:flex flex-col justify-center items-center py-5'>
          <div className='flex cursor-pointer lg:mx-2 mx-0 font-outfit'>
          <input type="range" 
          min={6}
          max={12}
          value={length}
          id="lengthInput"
          onChange={(e) => {setLength(parseInt(e.target.value))}}
          />
          <label htmlFor='lengthInput' className='flex justify-center items-center mx-1 lg:px-5 px-0'>Length({length})</label>  
      
          </div>
<div className='flex-col flex lg:Flex-row md:flex-row md:mt-5 '>

    {checkboxes.map( (data: any, index: number) => {
      
      return(
        <div key={index} className='flex mx-2  '>
            <input 
            type="checkbox" 
            className='mx-1'
            onChange={() => handleInputChange(data.id)}
            id={data.id}
            checked={data.state} />
            <label className='font-outfit' htmlFor={data.id}>{data.label}</label>
          </div>
)
}
)}
</div>
      
  
        </div>

      </div>

    </div>
</div>
      </div>
     </div>
    </>
  )

}
export default App; 