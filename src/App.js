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
  
  render() {
    console.log(this.state.items);
    const style={
      backgroundColor: "#ff0000"
    }

    const items = this.state.items; 
    let itemList = items.length ? (
      <div className="row justify-content-center">
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
      <BrowserRouter>
        <PropsRoute path="/home" component={Characters} itemList={itemList} />
        <PropsRoute path="/add-item" component={AddItem} />
      </BrowserRouter>
    </div>
  );
  }
}

export default App;