import React, { Component } from 'react';
import { Glyphicon, NavItem } from 'react-bootstrap';

class Logout extends Component{
	constructor(){
		super();
		this.logout = this.logout.bind(this);
	}

	logout(){
		// event.preventDefault();
		console.log("YO");
		localStorage.clear();
	}

	render(){
		return(
			<NavItem href="/" id="logout" onClick={this.logout}>
				<Glyphicon glyph="log-out"/> Logout
			</NavItem>
		)
	}
}

export default Logout;