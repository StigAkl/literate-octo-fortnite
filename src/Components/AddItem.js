import React, { Component } from 'react';

class AddItem extends Component {

    state = {
        name: "", 
        rarity: "", 
        lastSeen: null, 
        price: null
    }

    render() {
        return (
            <div>
                <p>Add item here..</p>
            </div>
        );
    }
}

export default AddItem;