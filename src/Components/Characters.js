import React from 'react';
const Characters = (props) => {
    
    return (
        <div className="container">
            {props.itemList}
        </div>
    );
};

export default Characters;