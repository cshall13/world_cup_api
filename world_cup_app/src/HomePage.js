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
		const request = axios.get(url);
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
				        width: 10%;
				        height: 5%;
				    }
			    `}</style>
			    <Image src={source} bsClass='custom' rounded />   {name}
			</div>
		);
	}

	render() {
		const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5lbg0vG686tBrYk7FoRyXkWqOyZhOoSFLQ9BzOW5qTiFDkJM1';
		const background = {
			backgroundImage : 'url('+ url +')',
			backgroundRepeat: 'no-repeat',
			// backgroundPosition: 'center',
			backgroundSize: 'cover'
		}
		const groupTable = this.state.group.map((data, index)=>{
			const character = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
		
			// console.log(index);
			return(
				<Col sm={6} md={3}>
					<Table  bordered  hover>
						<thead className='groupHeader'>
							<tr>
								<th className='text-center'>Group {character[index]}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><Link to={`/team/${data[0].id}`} className="team-link">{this.imageStyle(data[0].flag, data[0].name)}</Link></td>
							</tr>
							<tr>
								<td><Link to={`/team/${data[1].id}`} className="team-link">{this.imageStyle(data[1].flag, data[1].name)}</Link></td>
							</tr>
							<tr>
								<td><Link to={`/team/${data[2].id}`} className="team-link">{this.imageStyle(data[2].flag, data[2].name)}</Link></td>
							</tr>
							<tr>
								<td><Link to={`/team/${data[3].id}`} className="team-link">{this.imageStyle(data[3].flag, data[3].name)}</Link></td>
							</tr>
						</tbody>
					</Table>
				</Col>
			)
		})

		return (
			<div className='homeDiv col-lg-12' style={background}>
				<div className='topBanner col-lg-12'>
					<span> 2018 FIFA WORLD CUP RUSSIA</span>
				</div>
				<div className='groupDiv col-md-12'>
					{groupTable}
				</div>
				<div className='bottomBanner'>
					<img src=''/>
				</div>
			</div>
		)
	}
}

export default HomePage;