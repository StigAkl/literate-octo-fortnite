import React, { Component } from 'react';
import "../assets/default.css"
import kkk from "../assets/imgs/kk.jpg"

class Character extends Component {
    constructor(props) {
        super(props); 
        this.item = this.props.item; 
    }

    render() {

        const bgStyle = {
            backgroundImage: `url(${this.item.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "auto 100%",
            height: "83%"
        }

        return (
            <React.Fragment>
            <div className='col-md-3 item'>
                
                <div style={bgStyle} className='bgimage'></div>

                <div className="info-box" >
                    <p className="name">{this.item.name}</p>
                    <p className="price">V-bucks: {this.item.price.toFixed(0)}</p>
                    <p className="last-seen">Last seen: {this.item.available}</p>
                </div>
            </div>
            <div className="col-md-1 col-md-offset-1"></div>
            </React.Fragment>
        );
    }
}

export default Character;