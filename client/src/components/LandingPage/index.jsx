import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <h1>Wellcum</h1>
            <Link to ='/home'>Gotta catch em all!</Link>
        </div>
    )
}