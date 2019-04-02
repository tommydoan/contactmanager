import React, { Component } from 'react'
import axios from 'axios';
import {Consumer} from '../../Context';
import {Link} from 'react-router-dom';
class Contact extends Component {
    state={
        checkClick:false
    }   
    onClick=()=>{
        this.setState({
            checkClick:!this.state.checkClick
        })
    }
    deleteHandler= async (id,dispatch)=>{
         await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        dispatch({
            type:'DELETE_CONTACT',payload:id
        })
        
    }
  render() {
      const {id,name,phone,email}=this.props.contact;
      const {checkClick}=this.state
    return (
        <Consumer>
            {value=>{
                const {dispatch}=value
                return (
                <div className="card card-body mb3">
                <h4 >{name}<i onClick={this.onClick} className="fas fa-sort-down" style={{cursor:'pointer'}}></i>               
                <i onClick={this.deleteHandler.bind(this,id,dispatch)} className="fas fa-times" style={{cursor:'pointer',float:'right',color:'red'}}></i>
                <Link to={`/edit/${id}`} className="fas fa-user-edit" style={{cursor:'pointer',float:'right',marginRight:'1rem'}}></Link>
                </h4>          
                    {checkClick ? (<ul className="list-group">
                        <li className="list-group-item">Phone:{phone}</li>
                        <li className="list-group-item">Email:{email}</li>                        
                    </ul>) : null }
                 </div>
                 )
            }}
        </Consumer>
            
    )
  }
}
export default Contact;