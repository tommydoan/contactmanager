import React, { Component } from 'react';
import {RashRouter as Router,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './layout/Header';
import Contacts from './component/Contacts/Contacts';
import {Provider} from './Context';
import About from './component/pages/About';
import AddContact from './component/Contacts/AddContact';
import EditContact from './component/Contacts/EditContact';

import NotFound from './component/pages/NotFound';
import Test from './component/Test/Test';
class App extends Component {
  render() {
    return (
        <Provider> 
         <Router>
            <div>
                <Header/>
                <div className="container"> 
               <Switch>
                 <Route exact path="/about" component={About}/>
                 <Route exact path="/addcontact" component={AddContact} />     
                 <Route exact path="/edit/:id" component={EditContact}/> 
                 <Route exact path="/" component={Contacts}/>
                 <Route exact path="/test" component={Test}/>
                 <Route component={NotFound}/>
               </Switch>
                </div>
            </div> 
          </Router>  
        </Provider>
            
    )
  }
}
export default App;