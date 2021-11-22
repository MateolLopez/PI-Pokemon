import React from 'react';
import { useState } from "react";
import { useDispatch} from "react-redux";
import { searchPokemons } from '../../actions/index.js';
import './SearchBar.css'

const SearchPokemon = () => {
   const dispatch = useDispatch();
   const [name, setName] =  useState('');

    function handleInputChange(e){ 
       e.preventDefault();
       setName(e.target.value)
       //console.log(name)
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchPokemons(name)) //Envia estado local a la acción
    }


return (
        <div className="container-search">
            <input 
                    type="text"
                    placeholder="Pokemon..."
                    value={name}
                    onChange={(e)=>handleInputChange(e)}
            />
            
            <button type="submit" className="boton" id="searchbtn"  onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
      );
}
 
export default SearchPokemon;