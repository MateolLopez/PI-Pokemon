import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { getTypes, submitPokemon } from '../../actions/index.js'
import {useDispatch, useSelector} from 'react-redux';
import './PokeCreate.css'



export default function PokeCreate(){
	const dispatch = useDispatch();
	const allTypes = useSelector(state => state.types)
	useEffect(() => {
		dispatch(getTypes())
	}, [dispatch])

	// Estados
    const [input, setInput] = useState({
        name: '',
        hp:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:'',
        img:'',
        types: []
    })

    // Functions handle
    function handleChange(e){
    	setInput({
        	...input,
        	[e.target.name]: e.target.value
    	})
    }
    function handleSelect(e){
    	setInput({
        	...input,
        	types: [...input.types, e.target.value]
    	})
    }
    function handleSubmit(e){
    	e.preventDefault();
    	console.log(input)
    	dispatch(submitPokemon(input));
    	setInput({
        	name: '',
        	hp:'',
        	attack:'',
        	defense:'',
        	speed:'',
        	height:'',
        	weight:'',
        	img:'',
        	types: []
    	})
	}

 	return (
		<div className="all-form">
			<div className='title-form'>
				<h1>Create your own Pokemon!</h1>			
			</div>

			<form onSubmit={(e) => handleSubmit(e)} className='form'>
				<input name="name" placeholder='Name' value={input.name} 	onChange={(e)=>handleChange(e)}/>
				<input type="number" name="hp" placeholder='HP' value={input.hp} 		onChange={(e)=>handleChange(e)}/>
				<input type="number" name="attack" placeholder='Attack' value={input.attack} 	onChange={(e)=>handleChange(e)}/>
				<input type="number" name="defense" placeholder='Defense' value={input.defense} 	onChange={(e)=>handleChange(e)}/>
				<input type="number" name="speed" placeholder='Speed' value={input.speed} 	onChange={(e)=>handleChange(e)}/>
				<input type="number" name="height" placeholder='Height' value={input.height} onChange={(e)=>handleChange(e)}/>
				<input type="number" name="weight" placeholder='Weight' value={input.weight} onChange={(e)=>handleChange(e)}/>
				<input name="img" placeholder='Img' value={input.img} onChange={(e)=>handleChange(e)}/>
				<h4>Type 1</h4>
				
				<h4>Type 2</h4>
				<select className="typeA" onChange={(e) => handleSelect(e)}>
					{
						allTypes.map(e => {
							return(
								<option value={e}>{e}</option>
							)
						})
					}
				</select>
				<select className="typeB" onChange={(e) => handleSelect(e)}>
					{
						allTypes.map(e => {
							return(
								<option value={e}>{e}</option>
							)
						})
					}
				</select>
				<div className="btn-submit">
					<button type="submit">Create!</button>	
				</div>
			</form>

			<div className='btn-return'>
				<Link to='/home'>
					<h2>Volver</h2>
				</Link>
			</div>
		</div>
	)
}
