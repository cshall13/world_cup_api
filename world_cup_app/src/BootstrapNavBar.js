import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Form, FormControl, FormGroup, Glyphicon, InputGroup, Nav, Navbar, NavItem } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

class BootstrapNavBar extends Component {
	constructor() {
		super();
		this.state = {
			collapsed: false
		}
		this.collapse = this.collapse.bind(this);
	}

	collapse() {
		this.setState({
			collapsed: !this.state.collapsed
		})
	}

	buttonStyle() {
		bootstrapUtils.addStyle(Button, 'custom');
		return (
			<div>
			    <style type="text/css">{`
				    .btn-custom {
				        background-color: #222;
				        color: grey;
				        border: 1px solid #080808;
				    }
			    `}</style>
			    <Button onClick={this.collapse} bsSize="xsmall" bsStyle="custom">
					<Glyphicon glyph="search" />
				</Button>
			</div>
		);
	}

	formStyle() {
		bootstrapUtils.addStyle(InputGroup, 'custom');
		return (
			<div>
			    <style type="text/css">{`
				    .input-group-custom {
				        width: 100%;
				    }
			    `}</style>
			    <InputGroup bsStyle="custom">
				    <FormControl type="text" placeholder="Search" />
				    <InputGroup.Button>
				       	<Button type="submit">Search</Button>
				    </InputGroup.Button>
				</InputGroup>
			</div>
		);
	}

	render() {
		const customButtonStyle = this.buttonStyle();
		const customFormStyle = this.formStyle();
		return (
<<<<<<< HEAD
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">Home</Link>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<NavItem href="#">
						Groups
					</NavItem>
					<NavItem href="#">
						Schedule
					</NavItem>
				</Nav>
				<Nav pullRight>
					<NavItem href="#">
						<Glyphicon glyph="user" /> Register
					</NavItem>
					<NavItem href="#">
						<Glyphicon glyph="log-in" /> Login
					</NavItem>
					<NavItem>
						{customButtonStyle}
					</NavItem>
				</Nav>
				<Collapse in={this.state.collapsed}>
					<Form>
					    <FormGroup>
						    {customFormStyle}
					    </FormGroup>{' '}
					</Form>
				</Collapse>				
			</Navbar>
=======
			<div className="container">
				<h1><Link to="/register"> Register </Link></h1>
				<h1><Link to="/login"> Login </Link></h1>
			</div>
>>>>>>> login works, no handling on incorrect login info
		)
	}
}

export default BootstrapNavBar;