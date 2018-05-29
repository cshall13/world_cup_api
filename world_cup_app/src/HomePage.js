import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Image, Table } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import axios from 'axios';

class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			group: []
		}
	}

	componentDidMount() {
		console.log("The component has mounted!");
		const url = 'http://localhost:4000/home';
		const request = axios.get(url)
		request.then(receivedData=>{
			this.setState({
				group: receivedData.data.groups
			});
		})		
	}

	imageStyle(source, name) {
		bootstrapUtils.addStyle(Image, 'custom');
		return (
			<div>
			    <style type="text/css" >{`
				    .custom-rounded {
				        width: 5%;
				        height: 5%;
				    }
			    `}</style>
			    <Image src={source} bsClass='custom' rounded />   {name}
			</div>
		);
	}

	render() {
		const groupTable = this.state.group.map((data, index)=>{
			const character = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
			// console.log(index);
			return(
				<Col sm={6} md={3}>
					<Table striped bordered condensed hover>
						<thead>
							<tr>
								<th className='text-center'>Group {character[index]}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{this.imageStyle(data[0].flag, data[0].name)}</td>
							</tr>
							<tr>
								<td>{this.imageStyle(data[1].flag, data[1].name)}</td>
							</tr>
							<tr>
								<td>{this.imageStyle(data[2].flag, data[2].name)}</td>
							</tr>
							<tr>
								<td>{this.imageStyle(data[3].flag, data[3].name)}</td>
							</tr>
						</tbody>
					</Table>
				</Col>
			)
		})

		return (
			<div>
				{groupTable}
			</div>
		)
	}
}

export default HomePage;