import React from 'react';
import "../assets/default.css"

const Menu = (props) => {
    
    return (
                <div className="topMenu">
                     <select>
                        <option value="common">Common</option>
                        <option value="uncommon">Uncommon</option>
                        <option value="rare">Rare</option>
                        <option value="epic">Epic</option>
                        <option value="legendary">Legendary</option>
                        <option value="mythic">Mythic</option>
                        <option value="marvel">Marvel</option>
                    </select> 
                </div>
    );
};

export default Menu;