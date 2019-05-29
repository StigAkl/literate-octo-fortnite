import React, {Component} from 'react';
import Character from './Components/Character'; 
import {fetchAllItems} from "./api/api-service";
class App extends Component {
  constructor(props) {
    super(props); 
    
    this.state = {
      items: []
    }
  }


  componentDidMount() {
    fetchAllItems((result) => {
      this.setState({
        items: result
      })
    })
  }

  render() {

    const style={
      backgroundColor: "#ff0000"
    }
    const items = this.state.items; 

    let itemList = items.length ? (
      <div className="row">

        {items.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
                <Character styleting={style} item={item} />
            </React.Fragment>
          )
        })}

      </div>
    ) : <p>Ingen data..</p>

    const charStyle = {
      backgroundColor: "#00ccff"
    }

  return (
    <div className="container">
        {itemList}
    </div>
  );
  }
}

export default App;
