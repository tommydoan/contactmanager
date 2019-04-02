import React, { Component } from 'react'
import Contact from './Contact';
import {Consumer} from '../../Context';
class Contacts extends Component {
    
  render() {     
    return (
        <Consumer>
            {value=>{
                const {contacts}=value
                return (
                    <React.Fragment>     
                        <div>
                            <h1 className="display-4 mb-2" ><pan className="text-success">Contact</pan>List</h1>
                            </div>                    
                        {contacts.map(contact=>(
                            <Contact key={contact.id} contact={contact} /> 
                        ))}
                    </React.Fragment>)
            }}
        </Consumer>
                
      
    )
  }
}
export default Contacts;