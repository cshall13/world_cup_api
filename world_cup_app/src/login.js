import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component{
  constructor(){
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.state ={
      message: ""
    }
  }


  handleLogin(event){
  	event.preventDefault();

  	const email = document.getElementById('email').value;
  	const password = document.getElementById('pwd').value;

  	const loginRequest = axios({
  		method: "POST",
  		url: "http://localhost:4000/login",
  		data:{
  			email,
  			password
  		}
  	})

  	loginRequest.then((userData)=>{
  		// console.log(userData.data)
  		if(userData.data.msg === "loginSuccess" ){
  		    localStorage.setItem('token',userData.data.token)
  		    this.props.history.push('/')
          // console.log(localStorage.token)
  		} 
  		// else {

  		// }
  	})
  }


  render(){
  	// JSX DEMANDS all self-closing tags, be closed with a /
    return(
    <div className="container">
      <h1> Login </h1>
  		<form onSubmit={this.handleLogin} className="form1">
  		  <div className="form-group ">
  		    <label htmlFor="email">Email address:</label>
  		    <input type="email" className="form-control" id="email" placeholder="example@gmail.com"/>
  		  </div>
  		  <div className="form-group">
  		    <label htmlFor="pwd" >Password:</label>
  		    <input type="password" className="form-control" id="pwd" placeholder="Password"/>
  		  </div>
  		  <div className="checkbox">
  		    <label><input type="checkbox" /> Remember me</label>
  		  </div>
  		  <button type="submit" className="btn btn-default">Submit</button>
  		</form>
	 </div>
    ) 
  }
}

export default Login;