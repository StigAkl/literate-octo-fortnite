import React, {Component} from 'react';
import Character from './Components/Character'; 
import { fetchAllItems } from "./api/api-service";

class App extends Component {

  constructor() {
    super(); 
    this.state = {
      items: [],
      desc: false
    }
  }

  handleSort = () => {
    
    let items = this.state.items; 

    items.sort((a,b) => this.state.desc ? (new Date(a.lastSeen) - new Date(b.lastSeen)) : (new Date(b.lastSeen) - new Date(a.lastSeen))); 

    this.setState({
      items,
      desc: !this.state.desc
    }); 
  }

  
  componentDidMount() {
    fetchAllItems((result) => {

      result.sort((a,b) => (new Date(a.lastSeen) - new Date(b.lastSeen))); 

      this.setState({
        items: result
      })
    })
  }
  
  

  render() { 

    const {items} = this.state; 

  return (
      <div className="container">
      <button onClick={this.handleSort}>Toggle Sort</button>
      <div className="row justify-content-center">
          {items ? items.map((c,i) => <Character item={c} key={i} />) : <p>Ingen data</p>}
          </div>
      </div>
  );
  }
}

export default App;