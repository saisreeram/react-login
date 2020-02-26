import React, {Component} from 'react';
import {PostData} from '../../services/PostData';
import {Redirect} from 'react-router-dom';
import './Signup.css';
import { Alert
} from 'reactstrap';

class Signup extends Component {

  constructor(props){
    super(props);
   
    this.state = {
     username:'',
     password:'',
     email:'',
     name:'',
     phone_no:'',
     aadhar_no:'',
     date_of_birth:'',
     redirectToReferrer: false,
     phone_error:null,
     aadhar_error:null,
     username_error:null
    };

    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);

  }
 

  signup() {
    if(this.state.username && this.state.password && this.state.email && this.state.name && this.state.phone_no && this.state.aadhar_no && this.state.date_of_birth){
    PostData('signup',this.state).then((result) => {
      let responseJson = result;
    
      if(responseJson.status){  
        //popup verify email
        // sessionStorage.setItem('userData',JSON.stringify(this.state));
        this.setState({redirectToReferrer: true});
      }
      if (responseJson.status===0) {

        
        this.setState({username_error:'invalid User Name'})

      } 
        
      
     });
    }
  }

 onChange(e){
   this.setState({[e.target.name]:e.target.value});
   if(e.target.name==='phone_no')
   {
   var x = e.target.value;
   var y = x.toString();
   
   if (y.length!=10)
   {
    
     this.setState({phone_error:'invalid phone number'})
   }
   else{
    this.setState({phone_error:null})
   }
   }


   if(e.target.name==='aadhar_no')
   {
   var x = e.target.value;
   var y = x.toString();
   
   if (y.length!=12)
   {
    
     this.setState({aadhar_error:'invalid aadhar number'})
   }
   else{
    this.setState({aadhar_error:null})
   }
   }




  }


  render() {
    if (this.state.redirectToReferrer){
      return(<Redirect to ={'/home'}/>)
    }
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'}/>)
    }
   
  

    return (
      
      <div className="row " id="Body">
        <div className="medium-5 columns left">
        <h4>Signup</h4>
        <label>Email</label>
        <input type="text" name="email"  placeholder="Email" onChange={this.onChange}/>
        <label>Name</label>
        <input type="text" name="name"  placeholder="Name" onChange={this.onChange}/>
        <label>Username</label>
        {this.state.username_error?<Alert color="danger">{this.state.username_error}</Alert> : null}

        <input type="text" name="username" placeholder="Username" onChange={this.onChange}/>
        <label>Password</label>
        <input type="password" name="password"  placeholder="Password" onChange={this.onChange}/>
        <label>phone_no</label>
        {this.state.phone_error?<Alert color="danger">{this.state.phone_error}</Alert> : null}
        <input type="number" name="phone_no"  placeholder="phone_id" onChange={this.onChange}/>
        <label>aadhar_no</label>
        {this.state.aadhar_error?<Alert color="danger">{this.state.aadhar_error}</Alert> : null}

        <input type="number" name="aadhar_no"  placeholder="aadhar_no" onChange={this.onChange}/>
        <label>date_of_birth</label>
        <input type="text" name="date_of_birth"  placeholder="date_of_birth" onChange={this.onChange}/>
        <input type="submit" className="button" value="Sign Up" onClick={this.signup}/>
        <a href="/login">Login</a>
        </div>
        
      </div>
    );
  }
}

export default Signup;