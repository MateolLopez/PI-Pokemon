const initialState = {
  types: [],
  pokemons: [],
}

function rootReducer (state= initialState, action){
  switch(action.type){
    case 'GET_POKEMONS':
      return{
        ...state,
        pokemons: action.payload
      }
      default: return state;
      

  }
}

export default rootReducer;