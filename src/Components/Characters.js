import React from 'react';

const Characters = (props) => {
    console.log("charas")
    console.log(props); 
    return (
        <div className="container">
            {props.itemList}
        </div>
    );
};

export default Characters;