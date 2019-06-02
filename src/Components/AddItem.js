import React, { Component } from 'react';
import axios from 'axios'; 

class AddItem extends Component {

    state = {
        name: "", 
        rarity: ['Uncommon'], 
        lastSeen: "", 
        price: "-1",
        success: "", 
        obtained: ["shop"],
        error: ""
    }

    addItems = (e) => {
        e.preventDefault(); 

        axios.get("https://fortnite-api.theapinetwork.com/items/list", {
            headers: {
                "Authorization": "..."
            }
        })
        .then((result) => {
            const data = result.data.data.filter((item) => {
                return item.item.type === "outfit"; 
            }); 

            let delay = 0; 

            data.forEach((item) => {
                let lastUpdate = item.lastUpdate; 
                var lastSeen = new Date(0); // The 0 there is the key, which sets the date to the epoch
                lastSeen.setUTCSeconds(lastUpdate);

                let name = item.item.name; 
                const obtained_type = item.item.obtained_type; 

                if(name.includes("Outfit")) {
                    name = name.replace("Outfit", "").trim(); 
                }

                if(name.includes("outfit")) {
                    name = name.replace("outfit", "").trim(); 
                }

                delay = delay + 600; 

                setTimeout(() => {
                    axios.get("https://fnbr.co/api/images?type=outfit&search="+name, {
                    headers: {
                    "x-api-key": "..."
                    }
                })
            
                .then((response) => {
                    const result = response.data.data; 
                    if(result.length === 0) {
                        console.log("No image for ", name); 
                    } else {

                        let image = result[0].images.png;
                        let rarity = result[0].rarity.charAt(0).toUpperCase() + result[0].rarity.slice(1); 
                        let price = obtained_type === "vbucks" ? result[0].price.replace(",","") : "-1";
                        let obtained = obtained_type === "vbucks" ? "Shop" : result[0].price; 

                        if (result[0].price.toLowerCase().includes("tier")) {
                            console.log("Yes"); 
                            if(obtained === "vbucks") {
                                obtained = result[0].price; 
                                price = "-1"; 
                            }
                        }

                        axios.post("http://localhost:3001/api/items", {
                            
                                name: name, 
                                price: price, 
                                rarity: rarity, 
                                lastSeen: lastSeen,
                                image: image, 
                                obtained: obtained
                            
                        }).then((result) => {
                            console.log("Success: ", result); 
                        }).catch((e) => {
                            console.log("Something went wrong for " + name + ":", e); 
                        });
                    }
                });

                }, delay)
            })

        });
    }

    handleSubmit = (e) => {
        e.preventDefault(); 
        
        axios.get("https://fnbr.co/api/images?type=outfit&search="+this.state.name, {
            headers: {
            "x-api-key": "..."
            }
        }).then((response) => {
            let result = response.data.data;
            
            if(result.length === 0) {
                this.setState({
                    error: "Could not fetch data for " + this.state.name
                }); 

                throw new Error(`Something went wrong..${this.state.error}`); 
            }
            else {
                const rarity = result[0].rarity.charAt(0).toUpperCase() + result[0].rarity.slice(1); 
                const price = result[0].price.replace(",",""); 
                
                this.setState({
                    rarity: rarity, 
                    price: price
                }); 

                axios.post("http://localhost:3001/api/items", {
                    name: this.state.name, 
                    rarity: this.state.rarity, 
                    lastSeen: this.state.lastSeen, 
                    price: this.state.price,
                    obtained: this.state.obtained[0]
                }).then((result) => {
                    this.setState({
                        success: "Success! " + result.data.name + " added!",
                        error: ""
                    })
                }).catch((error) => {
                    this.setState({
                        success: "",
                        error: error.response.data.error
                    })
                });

            }
            
        }).catch((err) => {

        });
    }


    render() {

        return (
            <div className="container">
                <button onClick={this.addItems}>Add all items</button>
            </div>
        );
    }
}

export default AddItem;