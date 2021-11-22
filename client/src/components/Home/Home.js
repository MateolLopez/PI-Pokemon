import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

import {getPokemons, getTypes, filterPerType, filterPerOrigin, filterPerName, filterPerAttack} from '../../actions';
import PokeCard from '../PokeCard/PokeCard.js';
import Paginacion from '../Paginacion/Paginacion.js';
import SearchPokemon from '../SearchBar/SearchBar.js';

import './Home.css'

export default function Home(){

	const dispatch = useDispatch();

	// Reemplaza mapStateToProps
	const allPokemons = useSelector((state) => state.pokemons)
	const allTypes = useSelector((state) => state.types)
	
	// Reemplaza mapDispatchToProps (se hace el dispatch de getPokemons apenas se monta el componente)
	useEffect(() => {
		dispatch(getTypes())
		dispatch(getPokemons())
	},[dispatch])

	console.log(allPokemons)


	// Paginado
	const [ordenPages, setOrdenPages] = useState('')

	// Se setea en 1 el useState del current Page
	const [currentPage, setCurrentPage] = useState(1)

	// Cantidad de pokemones por pagina
	const [pokemonsPerPage, setpokemonsPerPage] = useState(9)

	// index del primer elemento(1*9 = 9, 2*9 = 18 etc) y del ultimo (9-9 = 0, 18-9 = 9, etc)
	const indexOfLastPokemon = currentPage * pokemonsPerPage
	const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage

	// Recorto el array en base a los indices previamente planteados
	const currentsPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

	// Setea en el estado el numero de pagina a mostrar
	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber)
	}


	// Refresh
	function handleRefresh(e){
		e.preventDefault();
		dispatch(getPokemons())
	}

	//Funciones de filtrado
	function handleFilterType(e){
		e.preventDefault();
		dispatch(filterPerType(e.target.value))
		setCurrentPage(1)
		setOrdenPages(`Ordenando... ${e.target.value}`)
	}
	function handleFilterOrigin(e){
		e.preventDefault();
		dispatch(filterPerOrigin(e.target.value))
		setCurrentPage(1)
		setOrdenPages(`Ordenando... ${e.target.value}`)
	}
	function handleFilterName(e){
		e.preventDefault();
		dispatch(filterPerName(e.target.value))
		setCurrentPage(1)
		setOrdenPages(`Ordenando... ${e.target.value}`)
	}
	function handleFilterAttack(e){
		e.preventDefault();
		dispatch(filterPerAttack(e.target.value))
		setCurrentPage(1)
		setOrdenPages(`Ordenando... ${e.target.value}`)
	}


	return(
		<div className="Home">

			<div className="nav">

				<div className='botones'>
					<div className="SearchBar">
						<SearchPokemon />
					</div>

					<div className='crearpokemon'>
						<Link to='/create'>Create Pokemon!</Link>
					</div>

					<div className='refresh'>
						<a onClick={e => {handleRefresh(e)}}>Refresh</a>
					</div>				
				</div>



				<div className="filters-paged">
					
					<div>
						<label>Alphabetic</label>
						<select onChange={e => handleFilterName(e)}>
							<option value="none">Sin filtro</option>
							<option value='asc'>A to Z</option>
							<option value='desc'>Z to A</option>
						</select>					
					</div>

					<div>
						<label>Attack</label>
						<select onChange={e => handleFilterAttack(e)}>
							<option value="none">Sin filtro</option>
							<option value='asc'>Ascendente</option>
							<option value='desc'>Descendente</option>
						</select>
					</div>

					<div>
						<label>Type</label>
						<select onChange={e => handleFilterType(e)}>
							<option value="All">Sin filtro</option>
							{
								allTypes.map(e => {
									return(
										<option value={e}>{e}</option>
									)
								})
							}
						</select>
					</div>

					<div>
						<label>API o DB</label>
						<select onChange={e => handleFilterOrigin(e)}>
							<option value="none">Sin filtro</option>
							<option value='API'>Existente</option>
							<option value='Propio'>Creado</option>
						</select>					
					</div>
				</div>

				<div className="pagination">
					<Paginacion
						pokemonsPerPage={pokemonsPerPage} 
						allPokemons={allPokemons.length} 
						paginado={paginado}
					/>
				</div>
			</div>

			{
				currentsPokemons.length > 0 ?
				<div>
					<div className="pokeCards">
						{
							currentsPokemons?.map(e => {
								return(
									<PokeCard name={e.name} img={e.img} types={e.types} id={e.id}/>
								)
							})
						}
					</div>
				</div>
				:
				<div>
					<h1>Pokemon not Found</h1>
				</div>
			}
		</div>
	)
}