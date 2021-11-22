import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css';


const LandingPage = () => {
	return (
		<div className='landingPage'>

		<h1 className="title">Poke-App</h1>

			<div className='btn-landing'>
			
				<Link to='/home'>
					<button>Home</button>
				</Link>	
			</div>

		</div>
	)
}

export default LandingPage;