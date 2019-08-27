import React from 'react';
import Character from './../Components/Character'; 

const Characters = (props) => {
    
    const itemList = props.itemList.length ? (
        <React.Fragment>
        <div className="row justify-content-center">
          {props.itemList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                  <Character item={item} key={item.id} />
              </React.Fragment>
            )
          })}
  
        </div>
        </React.Fragment>
      ) : <p>Ingen data..</p>

    return (
        <div className="container">
            {itemList}
        </div>
    );
};

export default Characters;