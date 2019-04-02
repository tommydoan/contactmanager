// Context 
import React , {Component} from 'react';

const Context = React.createContext();

export class Provider extends Component {
    state={
        contacts:[
            {
                id:1,
                name:"Tommy",
                phone:"714-247-9314",
                email:"doantung144@gmail.com"
            },
            {
                id:2,
                name:"Henry",
                phone:"714-247-2222",
                email:"henry@gmail.com"
            },
            {
                id:3,
                name:"Cherry",
                phone:"714-247-3333",
                email:"cherry@gmail.com"
            }
       ]
    }

    render (){
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
            )
    }
}
export const Consumer=Context.Consumer;

// Contacts 
import React, { Component } from 'react'
import Contact from './Contact';
import {Consumer} from '../Context';
class Contacts extends Component {
    
     deleteContact=(id)=>{
        const {contacts}=this.state;
        const newContact=contacts.filter(contact=>contact.id!==id);
        this.setState({
            contacts:newContact
        })
    }
  render() {
      
      return (
          <Consumer>
              {value=>{
                  const {contacts}=value;
                  return (                  
                    <React.Fragment>
                    {contacts.map(contact=>( // Always usde with parenthases formap
                        <Contact key={contact.id} contact={contact} 
                        deleteContact={this.deleteContact.bind(this,contact.id)}/>
                    ))}
                    </React.Fragment>
                 )
              }}

          </Consumer>
      )
  }
}
export default Contacts;

// Contact 
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Consumer} from '../Context';
class Contact extends Component {
    state={
        checkClick:false
    }
    onoffClick=()=>{
        this.setState({
            checkClick:!this.state.checkClick
        })
    }
    deleteHandler=(id,dispatch)=>{
        dispatch({
            type:'DELETE_CONTACT',payload:id
        });
    };
  render() {

      const {id,name,phone,email}=this.props.contact;
      const {checkClick}=this.state;
    return (
        <Consumer>
            {value=>{
                const {dispatch}=value
                return ( 
                <div className="card card-body mb-3">
                <h4 >{name}<i onClick={this.onoffClick} className="fas fa-sort-down" style={{cursor:'pointer'}}></i>
                <i onClick={this.deleteHandler.bind(this,id,dispatch)} className="fas fa-times" style={{cursor:'pointer',float:'right',color:'red'}}></i>
                </h4>     
                {checkClick ? (<ul className="list-group">
                  <li className="list-group-item">phone:{phone}</li>
                  <li className="list-group-item">Email:{email}</li>
                </ul>) : null}               
                </div>)
            }}
        </Consumer>         
    )
  }
}
Contact.propTypes={
    contact:PropTypes.object.isRequired,
    deleteContact:PropTypes.func.isRequired

}
export default Contact;

// Context 
import React, { Component } from 'react'

const Context=React.createContext();
const reducer=(state,action)=>{
    switch(action.type){
        case 'DELETE_CONTACT':
        return {
            ...state ,
            contacts:state.contacts.filter(contact=>contact.id!==action.payload)
        }
        default:
            return state;
    }
}
export class Provider extends Component {
    state={
        contacts:[
            {
                id:1,
                name:"Tommy",
                phone:"714-247-9314",
                email:"doantung144@gmail.com"
            },
            {
                id:2,
                name:"Henry",
                phone:"714-247-2222",
                email:"henry@gmail.com"
            },
            {
                id:3,
                name:"Cherry",
                phone:"714-247-3333",
                email:"cherry@gmail.com"
            }
       ],
       dispatch:action=> this.setState(state=>reducer(state,action))
       
    };
  render() {
    return (
      <div>
        <Context.Provider value={this.state}>
            {this.props.children}
        </Context.Provider>
      </div>
    )
  }
}
export const Consumer=Context.Consumer;

// Addcontact ( normally)
import React, { Component } from 'react'
import uuid from 'uuid';
import {Consumer} from '../../Context';
import TextInputGroup from '../src/layout/TextInputGroup';
class AddContact extends Component {
    state={
      name:'',
      phone:'',
      email:''
    }
    onChange=(e)=>this.setState({[e.target.name]:e.target.value});
    onSubmit=(dispatch,e)=>{
      e.preventDefault();
      const {name,email,phone}=this.state
      const newContact={
        id:uuid(),
        name,
        email,
        phone,
      }
      dispatch({
        type:'ADD_CONTACT',payload:newContact
      })
      this.setState({
        name:'',
        phone:'',
        email:''
      })
    }

  render() {
    const {name,phone,email}=this.state;
    return ( 
      <Consumer>
        {value=>{
          const {dispatch}=value
          return (<div className="card mb-3">
        <div className="card-header">AddContact</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit.bind(this,dispatch)}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                  <input type="text"
                          name="name"
                          className="form-control form-control-lg"
                          placeholder="Enter Name"
                          value={name}
                          onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="name">Phone</label>
                  <input type="phone"
                          name="phone"
                          className="form-control form-control-lg"
                          placeholder="Enter Phone"
                          value={phone}
                          onChange={this.onChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                  <input type="email"
                          name="email"
                          className="form-control form-control-lg"
                          placeholder="Enter Email"
                          value={email}
                          onChange={this.onChange}/>
              </div>
              <input type="submit" value="Add Contact" className="btn btn-light btn-block"/>
            </form>
          </div>
      </div>)
        }}
      </Consumer>  
          
    )
  }
}
export default AddContact;

// Final review 1
//TextInputGroup.js
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';
 function TextInputGroup({
     label,
     name,
     type, 
     placeholder,
     value,  
     onChange,
     error
 }) {
  return (
    <div className="form-group">
                <label htmlFor={name}>{label}</label>
                  <input type={type}
                          name={name}
                          className={classnames('form-control form-control-lg',{'is-invalid':error})}
                          placeholder={placeholder}
                          value={value}
                          onChange={onChange}
                          
                          />
          {error &&  <div className="invalid-feedback">{error}</div> }
         
    </div>                          
  )
}
TextInputGroup.propTypes={
    name:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    placeholder:PropTypes.string.isRequired,
    label:PropTypes.string.isRequired,
    onChange:PropTypes.string.isRequired,
    error:PropTypes.string.isRequired
}
TextInputGroup.defaultProps={
    type:'text'
}
export default TextInputGroup;

// AddContact.js 
import React, { Component } from 'react'
import {Consumer} from '../../Context';
import uuid from 'uuid';
import TextInputGroup from '../../layout/TextInputGroup';
 class AddContact extends Component {
   state={
     name:'',
     phone:'',
     email:'',
     errors:{}
   }
   onChange=(e)=>this.setState({[e.target.name]:e.target.value})
   onSubmit=(dispatch,e)=>{
     e.preventDefault();
    const {name,phone,email}=this.state;
    // Check errors
    if(name===''){
      this.setState({errors:{name:'Name is required'}})
      return
    }
    if(phone===''){
      this.setState({errors:{phone:'Name is required'}})
      return
    }
    if(email===''){
      this.setState({errors:{email:'Name is required'}})
      return
    }
    const newContact={
      id:uuid,
      name,
      phone,
      email,
    }
    dispatch({
      type: 'ADD_CONTACT',payload:newContact
    })
    
    
    this.setState({
      name:'',
      phone:'',
      email:'',
      errors:''
      
    })
   }
  render() {
    const {name,phone,email,errors}=this.state
    
    return (
      <Consumer>
        {value=>{
          const {dispatch}=value
          return (<div className="card mb-3">
        <div className="card-header">Add Contact</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit.bind(this,dispatch)}>
              <TextInputGroup
                label="Name"  
                type="type"   
                name="name"           
                placeholder="Enter Name"         
                value={name}          
                onChange={this.onChange}
                error={errors.name}
                />
            
             <TextInputGroup
                label="Phone"  
                type="type"   
                name="phone"           
                placeholder="Enter Phone"         
                value={phone}          
                onChange={this.onChange}
                error={errors.phone}
                />
              <TextInputGroup
                label="Email"  
                type="email"   
                name="email"           
                placeholder="Enter Email"         
                value={email}          
                onChange={this.onChange}
                error={errors.email}
                />
              
              <input type="submit" value="Add Contact" className="btn btn-light btn-block"/>
            </form>
          </div>
      </div>)
        }}
      </Consumer>
      
    )
  }
}
export default AddContact;

// Header.js 
import React from 'react'
import PropTypes from 'prop-types'
function Header(props) {
    const {branding}=props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-success mb-3 py-0">
    <div className="container">
        <a href="/" className="navbar-brand">{branding}</a>
        <div>
            <ul className="navbar-nav mr-3">
                <li className="nav item">
                    <a href="/" className="nav-link">Home</a>
                </li>
            </ul>
        </div>
    </div>
    </nav>
  )
}
Header.defaultProps={
    branding:'Contact Manager'
}
Header.propTypes={
    branding:PropTypes.string.isRequired
}
export default Header;

//Contact.js 
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Consumer} from '../../Context';
class Contact extends Component {
    state={
        checkClick:false
    }
    onoffClick=()=>{
        this.setState({
            checkClick:!this.state.checkClick
        })
    }
    deleteHandler=(id,dispatch)=> {
        dispatch({
            type:'DELETE_CONTACT',payload:id
        });
    };
    
  render() {
      const {id,name,phone,email}=this.props.contact;
      const {checkClick}=this.state;
      
    return (   
        <Consumer>   
            {value=>{
                const {dispatch}=value
                return (
                <div className="card card-body mb-3">
                <h4 >{name}<i onClick={this.onoffClick} className="fas fa-sort-down" style={{cursor:'pointer'}}></i>
                <i onClick={this.deleteHandler.bind(this,id,dispatch)} className="fas fa-times" style={{cursor:'pointer',float:'right',color:'red'}}></i>
                </h4>     
                {checkClick ? (<ul className="list-group">
                  <li className="list-group-item">phone:{phone}</li>
                  <li className="list-group-item">Email:{email}</li>
                </ul>) : null}               
                </div>   
                )
            }}             
         </Consumer>                                      
        )               
    }
}
Contact.propTypes={
    contact:PropTypes.object.isRequired,
    
}
export default Contact;

// Contacts.js
import React, { Component } from 'react'
import Contact from './Contact';
import {Consumer} from '../../Context';
class Contacts extends Component {
    render() {
      return(
        <Consumer>
          {value=>{
            const {contacts}=value;
            return (                  
               <React.Fragment>
                {contacts.map(contact=>(
                    <Contact key={contact.id} contact={contact}
                  />
                ))}
                </React.Fragment>
               )       
          }}

        </Consumer>
      )          
    }   
}
export default Contacts;

// App.js
import React, { Component } from 'react';
import './App.css';
import Contacts from './component/Contacts/Contacts';
import Header from './layout/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from './Context';
import AddContact from './component/Contacts/AddContact';
class App extends Component {
  render() {
    return (
      <Provider>
          <div>
            <Header/>
            <div className="container">
              <AddContact/>
              <Contacts/>
            </div>
        </div>
      </Provider>
    )
  }
}
export default App;

// Context
import React, { Component } from 'react'
const Context=React.createContext();
const reducer=(state,action)=>{
    switch(action.type){
        case 'DELETE_CONTACT' :
        return {
            ...state,
            contacts:state.contacts.filter(contact=>contact.id!==action.payload) 
        }
        case 'ADD_CONTACT':
        return {
            ...state,
            contacts:[action.payload,
            ...state.contacts
            ]
        }
        default :
        return state;
        
    }
}
export class Provider extends Component {
    state={
        contacts:[
            {
                id:1,
                name:"Tommy",
                phone:"714-247-9314",
                email:"doantung144@gmail.com"
            },
            {
                id:2,
                name:"Henry",
                phone:"714-247-2222",
                email:"henry@gmail.com"
            },
            {
                id:3,
                name:"Cherry",
                phone:"714-247-3333",
                email:"cherry@gmail.com"
            }
       ],   
       dispatch:action=>{
           this.setState(state=>reducer(state,action))
       }
      
    };
  render() {
    return (
      <div>
        <Context.Provider value={this.state}>
            {this.props.children}
        </Context.Provider>
      </div>
    )
  }
}
export const Consumer=Context.Consumer;