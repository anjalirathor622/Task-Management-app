import React, { useState } from 'react'
import Cards from '../components/Home/Cards'
import { MdOutlineAddCircle } from "react-icons/md";
import InputData from '../components/Home/InputData';

const AllTask = () => {    
    const [inputDiv, setInputDiv] = useState("hidden")
  return (
    <>
    <div>
        <div className='w-full flex  justify-end p-4'>
            <button onClick={()=>setInputDiv("fixed")}>
                <MdOutlineAddCircle className='text-3xl text-gray-500 hover:text-gray-100  transition-all duration-300' />
            </button>
        </div>
        <Cards home={true} setInputDiv={setInputDiv} />
    </div>
    <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />
    </>
  )
}

export default AllTask