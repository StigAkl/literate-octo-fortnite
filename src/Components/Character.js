import React, { Component } from 'react';
import "../assets/default.css"

class Character extends Component {
    constructor(props) {
        super(props); 
        this.item = this.props.item; 
    }

    render() {
        const rarity = this.item.rarity;
        const infoClass = "info-box background-" + rarity.toLowerCase();

        const bgStyle = {
            backgroundImage: `url(${this.item.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 100%",
            height: "83%",
            marginLeft: "-33%"
        }
        
        const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const lastSeen = new Date(this.item.lastSeen); 
        const formatted_date = lastSeen.getDate() + ". " + months[lastSeen.getMonth()] + " " + lastSeen.getFullYear(); 

        return (
            <React.Fragment>
            <div className='col-md-2 item'>
                
                <div style={bgStyle} className='bgimage'></div>

                <div className={infoClass}>
                    <div className="name">{this.item.name}</div>
                    <div className="price">
                        <img src="https://gamepedia.cursecdn.com/fortnite_gamepedia/f/f3/V-bucks_icon.png?version=970070f7945ee6930b14d520ec1f59b7" className="vbuckIcon"></img>
                            {this.item.price.toFixed(0)}
                    </div>
                    <div className="last-seen">Last seen: {formatted_date}</div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

export default Character;