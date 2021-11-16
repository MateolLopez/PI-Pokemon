import axios from 'axios';

export default function getPokemons(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:4001/pokemons",{});
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}