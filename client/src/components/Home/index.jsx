import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import  { Link } from 'react-router-dom';
import Card from '../Card';
import getPokemons from '../../actions';

export default function Home (){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const [currentPage, setCurrentPage] = useState(1)
    const [pkmnPerPage, setPkmnPerPage] = useState(20) //pkmn per page
    const lastPkmnIndex = currentPage * pkmnPerPage
    const firstPkmnIndex = lastPkmnIndex - pkmnPerPage
    const currentPkmns = allPokemons.slice(firstPkmnIndex,lastPkmnIndex); //Pkmn oder for each page

    const pager = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getPokemons()) //reemplaza maptstate mapdispatchtoprops
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    return(
        <div>
            <Link to='/pokemons'>Create Pokemon</Link>
            <h1>Titulingo</h1>
            <button onClick={e=> {handleClick(e)}}>
                Recharge Pokemons
            </button>
            <div>
                <select>
                    <option value='ascAtZ'>A to Z</option>
                    <option value='desAtZ'>Z to A</option>
                    <option value='ascAtt'>+ Atk</option>
                    <option value='desAtt'>- Atk</option>
                </select>
                <select>
                    <option value='All'>All</option>
                    <option value='Official'>Official</option>
                    <option value='Created'>Created by user</option>
                </select>
                <select>
                    <option value='type'>By type</option>
                </select>
                {allPokemons?.map((c)=>{
                    return(
                        <fragment className ='Cards'>
                            <Link to={"/home/"+c.id}>
                                <Card name={c.name} type={c.type} img={c.img}/>
                            </Link>
                        </fragment>
                    )
                })}
                
            </div>
        </div>
    )

}