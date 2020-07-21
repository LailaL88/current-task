import React from "react";

function Buttons(props){
    return(
        <>
        <button onClick={props.goToSlide(1)}></button>
          <button onClick={props.goToSlide(2)}></button>
          <button onClick={props.goToSlide(3)}></button>
          <button onClick={props.goToSlide(4)}></button>
          <button onClick={props.goToSlide(5)}></button>
          <button onClick={props.goToSlide(6)}></button> 
          </>
    )
}

export default Buttons;