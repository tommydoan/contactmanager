import React, { Component } from 'react'
import {Consumer} from '../../Context';
import axios from 'axios';
import TextInputGroup from '../../layout/TextInputGroup';
class AddContact extends Component {
    state={
        name:'',
        phone:'',
        email:'',
        errors:{}
    }
    async componentDidMount(){
        const {id}=this.props.match.params;
        const res=await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        const contact=res.data;
        this.setState({
            name:contact.name,
            phone:contact.phone,
            email:contact.email
        })
    }
    onSubmit=async(dispatch,e)=>{
        e.preventDefault();
        const {name,phone,email}=this.state;
        if(name===''){
            this.setState({errors:{name:"Name is required"}})
            return
        }
        if(phone===''){
            this.setState({errors:{phone:"Name is required"}})
            return
        }
        if(email===''){
            this.setState({errors:{email:"Name is required"}})
            return
        }
        const newContact={
           
            name,
            phone,
            email
        }
        const res= await axios.post('https://jsonplaceholder.typicode.com/users',newContact)
       try{
        dispatch({
            type:'ADD_CONTACT',payload:res.data
        })
        } catch(e){
            dispatch({
                type:'ADD_CONTACT',payload:res.data
            })
        } 
        
        // Clear state
        this.setState({
            name:'',
            phone:'',
            email:''
        })          
    }
    onChange=(e)=>{this.setState({[e.target.name]:e.target.value})}
  render() {
      const {name,phone,email,errors}=this.state
    return (
        <Consumer>
            {value=>{
                const {dispatch}=value
                return (<div className="card mb-3">
        <div className="card-header">Add Contact</div>
            <form onSubmit={this.onSubmit.bind(this,dispatch)}>
            <TextInputGroup
                label="Name"
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={this.onChange}
                value={name}
                error={errors.name}
                />
            <TextInputGroup
                label="Phone"
                type="text"
                name="phone"
                placeholder="Enter Phone"
                onChange={this.onChange}
                value={phone}
                error={errors.phone} 
                 /> 
            <TextInputGroup
                label="Email"
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={this.onChange}
                value={email}
                error={errors.email}  
                />         
             <input type="submit" value="Add Contact" className="btn btn-light btn-block"/>           
            </form>
      </div>)
            }}
        </Consumer>
      
    )
  }
}
export default AddContact;