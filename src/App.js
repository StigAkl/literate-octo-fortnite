import React, {Component} from 'react';
import Character from './Components/Character'; 
import Characters from './Components/Characters'; 
import AddItem from './Components/AddItem'; 
import {fetchAllItems} from "./api/api-service";
import {BrowserRouter, Route} from 'react-router-dom'; 
import axios from 'axios';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

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

  resetHandler = (e) => {
    console.log("Test")
    let items = []; 
    this.state.items.map((item) => {
      const id = item._id; 

      axios.put("http://localhost:3001/api/items/" + id, {
               "image": "https://image.fnbr.co/outfit/5ab17f395f957f27504aa54c/png.png"
             }).then((result) => {
               console.log(result.data); 
               items.push(result.data); 
             }).catch((err) => {
               console.log("Something went wrong when saving image: ", err); 
             })
    })

    this.setState({
      items
    })
  }
  
  buttonHandler = (e) => {

    let delay = 0; 
    this.state.items.map((item) => {
      delay = delay + 200; 
      setTimeout(() => {
        const id = item._id; 
        const name = item.name; 
        axios.get("https://fnbr.co/api/images?search="+name, {
          headers: {
            "x-api-key": "xxx"
          }
        }).then((result) => {
           if(result.data.data.length > 0) {
             console.log("Success: " + result.data.data[0].images.png); 
             const png = result.data.data[0].images.png; 

             axios.put("http://localhost:3001/api/items/" + id, {
               "image": png
             }).then((result) => {
               console.log(result.data); 
             }).catch((err) => {
               console.log("Something went wrong when saving image: ", err); 
             })
           } else {
             console.log("Could not find outfit");
           }
        }).catch((err) => {
          console.log("Error: ", err); 
        })
      },delay*2+1000)
    })
  }
  render() {
    console.log(this.state.items);
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

  return (

    <div>

      <button onClick={this.buttonHandler}>Fetch images</button>
      <button onClick={this.resetHandler}>Reset images</button>
      <BrowserRouter>
        <PropsRoute path="/home" component={Characters} itemList={itemList} />
        <PropsRoute path="/add-item" component={AddItem} />
      </BrowserRouter>
    </div>
  );
  }
}

export default App;