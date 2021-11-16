import React from "react";

export default function Card({ name, img, type }){
    return(
        <div>
            <img src={img} alt="img not found" width="100px" height="100px" />
            <h3>{name}</h3>
            <h5>{type}</h5>
        </div>
    )
}