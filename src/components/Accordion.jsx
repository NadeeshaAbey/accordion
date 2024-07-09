import React, { useState } from "react";
import data from "./data";
import "./styles.css"

function Accordion(){

    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId){
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultipleSelection(getCurrentId){
        let cpyMultiple = [...multiple];
        const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);
        if(findIndexOfCurrentId === -1){
            cpyMultiple.push(getCurrentId);
        }
        else{
            cpyMultiple.splice(findIndexOfCurrentId, 1);
        }
        setMultiple(cpyMultiple);
    }

    return(
        <div className="wrapper">
            <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Enable multi selection</button>
            <div className="accordion">
                {
                    data && data.length > 0 ?
                    data.map(item =>
                        <div className="item">
                            <div className="title" onClick={enableMultiSelection 
                                ? () => handleMultipleSelection(item.id) 
                                : () => handleSingleSelection(item.id)} >
                                <h3>{item.question}</h3>
                                <span>+</span>
                            </div>
                            {
                                selected === item.id || multiple.indexOf(item.id) !== -1 ? (
                                    <div className="answer">{item.answer}</div> 
                                ) 
                                :null
                            }
                        </div>
                    )
                    : <div>No data founded!</div>
                }
            </div>
        </div>
    )
}

export default Accordion;