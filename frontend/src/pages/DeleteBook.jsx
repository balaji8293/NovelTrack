import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import API_ENDPOINT from '../../config'

export default function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const handleEditBook = () => {
    setLoading(true);
    axios.delete(`${API_ENDPOINT}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully',{variant:'success'})
        navigate('/');
      })
      .catch((error) => {
        enqueueSnackbar('error',{variant:'error'})
        setLoading(false);
        console.log(error, 'got error')
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <h3>Are you sure want to delete? </h3>
        <button className='p-2 bg-red-300 m-8' onClick={handleEditBook}>
          Delete
        </button>
      </div>
    </div>
  )
}
