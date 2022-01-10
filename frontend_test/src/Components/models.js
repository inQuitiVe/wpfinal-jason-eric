import "antd/dist/antd.css"
import { useState } from 'react';
import Classification from "./mlmodels/classification/classification";

function Models(props) {
    return(
        <>
        {props.mlModel === "classification" ? 
        <Classification/> : <div></div>}
        </>
    )
}

export default Models