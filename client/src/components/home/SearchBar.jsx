import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loadingState, searchCountry } from '../../redux/actions';


export default function SearchBar() {

  const [ inputPais, setInputPais ] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(evento){
    evento.preventDefault();
    dispatch(searchCountry(inputPais.trim()))
    dispatch(loadingState(true))
  }

  function handleChange (e) {
		setInputPais(e.target.value)
	}

  return (
    <form className="buscador" onSubmit={(e) => handleSubmit(e)}>
        <button type='submit'>Buscar</button>
        <input maxLength="10" type="text" name='inputPais' autoComplete='off' placeholder='Ingrese un pais' value={inputPais} onChange={e => handleChange(e)}/>
    </form>
  )
}
