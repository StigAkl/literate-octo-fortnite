import React, { Component } from 'react';
import axios from 'axios'; 

class AddItem extends Component {

    state = {
        name: "", 
        rarity: ['Uncommon'], 
        lastSeen: "", 
        price: ["-1"],
        success: "", 
        error: ""
    }

    handleSubmit = (e) => {
        e.preventDefault(); 
        
        axios.post("http://localhost:3001/api/items", {
            name: this.state.name, 
            rarity: this.state.rarity[0], 
            lastSeen: this.state.lastSeen, 
            price: this.state.price[0]
        }).then((result) => {
            this.setState({
                success: "Success! " + result.name + " added!",
                error: ""
            })
        }).catch((error) => {
            console.log("Error: ", error.response.data); 
            this.setState({
                success: "",
                error: error.response.data.error
            })
        })
    }

    formatDate(date) {
        let dateArr = date.split("."); 

        let d = dateArr[0]; 
        let m = dateArr[1]; 
        let y = dateArr[2]; 

        let newDate = y + "-" + m + "-" + d; 
        console.log(newDate); 
        return new Date(newDate); 
    }

    handleChange = (e) => {
        e.preventDefault(); 


        if(e.target.id === "rarity" || e.target.id === "price") {
            let value = [e.target.value]; 
            this.setState({
                [e.target.id]: value
            })
        } 
        
        else if(e.target.id === "lastSeen") {
            let date = this.formatDate(e.target.value); 
            this.setState({
                [e.target.id]: date
            })
        }
        else {
            this.setState({
                [e.target.id]: e.target.value
            })
        }
        console.log(this.state); 
    }

    render() {
        return (
            <div className="container">
            <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input type="text" placeholder="Enter name" id="name" onChange={this.handleChange} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Last seen</label>
                        <input type="text" placeholder="Date last seen" value={this.state.lastSeen} id="lastSeen" onChange={this.handleChange} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                            <select value={this.state.price} onChange={this.handleChange} multiple className="form-control" id="price">
                                <option value="-1">Battlepass or bundle pack</option>
                                <option value="800">800</option>
                                <option value="1200">1200</option>
                                <option value="1500">1500</option>
                                <option value="2000">2000</option>
                            </select>
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                            <select value={this.state.rarity} onChange={this.handleChange} multiple className="form-control" id="rarity">
                                <option value="Uncommon">Uncommon</option>
                                <option value="Rare">Rare</option>
                                <option value="Epic">Epic</option>
                                <option value="Legendary">Legendary</option>
                            </select>
                    </div>
                    <button type="submit" className="btn btn-outline-primary">Add Item</button>
                </form>

                <div className="info-box">
                    {this.state.error && 
                    <div className="alert alert-danger" role="alert">
                        {this.state.error}
                    </div>}

                    {this.state.success && 
                    <div className="alert alert-success" role="alert">
                        {this.state.success}
                    </div>
                    }
                </div>
            </div>
        );
    }
}

export default AddItem;