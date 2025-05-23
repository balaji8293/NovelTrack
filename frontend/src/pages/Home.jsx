import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import {BsInfoCircle} from 'react-icons/bs'
import {AiOutlineEdit} from 'react-icons/ai'
import {MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'
import Spinner from '../components/Spinner';
import BooksTable from '../components/Home/BooksTable';
import BooksCard from '../components/Home/BooksCard';
import API_ENDPOINT from '../../config'

export default function Home() {
    const[books,setBooks]=useState([])
    const[loading,setLoading]=useState(false);
    const[showType,setShowType] = useState('');

    useEffect(()=>{
        setLoading(true);
        axios.get(`${API_ENDPOINT}/books`)
        .then((response)=>{
            setBooks(response.data.data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error,'error');
            setLoading(false);
        })
    },[])
  return (
    <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
            <button
                className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                onClick={()=>setShowType('table')}
            >
                Table
            </button>
            
            <button
                className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                onClick={()=>setShowType('card')}
            >
                Card
            </button>

        </div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Books list</h1>
            <Link to={'/books/create'}>
                <MdOutlineAddBox className='text-sky-800 text-4xl'/>
            </Link>
        </div>
        {
            loading?(
                <Spinner/>
            ):(
                showType ==='table'? <BooksTable books={books}/> : <BooksCard books={books}/>
            )
        }

    </div>
  )
}
