import React, {Component} from 'react';
import Character from './Components/Character'; 
import Characters from './Components/Characters'; 
import { fetchAllItems } from "./api/api-service";
import {BrowserRouter, Route} from 'react-router-dom'; 

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
      items: [],
      desc: true
    }
  }


  componentDidMount() {
    fetchAllItems((result) => {
      this.setState({
        items: result
      })
    })
  }

  handleSort = event => {
    event.preventDefault(); 
    const desc = !this.state.desc; 
    this.setState({
      desc
    });
  }

  render() {
    console.log(this.state.items);
    const style={
      backgroundColor: "#ff0000"
    }

    const items = this.state.desc ? 
    this.state.items.sort((a,b) => (new Date(b.lastSeen) - new Date(a.lastSeen)))
    : this.state.items.sort((a,b) => (new Date(a.lastSeen) - new Date(b.lastSeen))); 

    let itemList = items.length ? (
      <div className="row justify-content-center">
        <button onClick={this.handleSort}>Sort xD</button>
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
      </BrowserRouter>
    </div>
  );
  }
}

export default App;