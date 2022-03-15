import './App.css';
import React from 'react'

import {getMeaning} from './services/dictionary-service'; 

function App() {
  const [isLoading, setIsLoading]= React.useState(false);
  const [wordMeaning, setWordMeaning]= React.useState('');
  const [errorMsg, setErrorMsg]= React.useState('');

  const handleSubmit = async (e) =>{
    try {
      e.preventDefault()
      setIsLoading(true)
      setWordMeaning('')
      setErrorMsg('')
      const {word} = e.target.elements
      const response = await getMeaning ({word: word.value})

      setWordMeaning(response.data[0].meanings[0].definitions[0].definition)
    } catch (e){
      if (e.message.includes('404')){
        setErrorMsg('Word not found :( try another search')
      }
    }finally {
      setIsLoading(false)
    }
  }


  return (
    <div className='App'>
      <div className='container'>
      <h1 className='title'>Free Dictionary</h1>
      <form className='form' onSubmit={handleSubmit}>
        <label className='label' htmlFor="word">Word: {` `}</label>
        <input className='input' type="text" id='word' />
        <button className='btn' disabled={isLoading} type='submit'>
          Consult
        </button>
      </form>
   
      {isLoading && <p className='definition'>Loading...</p>}

      {!isLoading && wordMeaning && <p className='definition'>{wordMeaning}</p>}

      {!isLoading && !wordMeaning && !errorMsg && <p className='definition'>Type a word and click consult</p>}

      {!isLoading && errorMsg && <p className='definition'>{errorMsg}</p>}
      </div>
    </div>
  );
}

export default App;

