import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import './Login.css';
import { Alert
} from 'reactstrap'
class Login extends Component {

  constructor(){
    super();
   
    this.state = {
     user_name: '',
     password: '',
     redirectToReferrer: false,
     
     msg:null
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);

  }



  

  

  
        login() {
    if(this.state.user_name && this.state.password){
      PostData('login',this.state).then((result) => {
       let responseJson = result;
       console.log(result)
       if(responseJson.status===1){        
         sessionStorage.setItem('userData',JSON.stringify(responseJson));
         this.setState({redirectToReferrer: true});
       }
       else if(responseJson.status===0){
         this.setState({msg:'Invalid Username or Password'})

       }
       else if(responseJson.status===-1){
         this.setState({msg:'verify email'})
       }
       
      });
    }
    
   }


  onChange(e){
    this.setState({[e.target.name]:e.target.value});
   }

  
  

  render() {

     if (this.state.redirectToReferrer) {
      return (<Redirect to={'/home'}/>)
    }
   
    if(sessionStorage.getItem('userData')){
      return (<Redirect to={'/home'}/>)
    }

     return (
       
      <div className="row" id="Body">
        <div className="medium-5 columns left">
        <h4>Login</h4>
        {this.state.msg?<Alert color="danger">{this.state.msg}</Alert> : null}


        <label>Username</label>
        <input type="text" name="user_name" placeholder="Username" onChange={this.onChange}/>
        <label>Password</label>
        <input type="password" name="password"  placeholder="Password" onChange={this.onChange}/>
        <input type="submit" className="button success" value="Login" onClick={this.login}/>
        <a href="/signup">Registration</a>
        </div>
      </div>
    );
  }
}

export default Login;