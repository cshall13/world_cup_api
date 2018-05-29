import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Image, OverlayTrigger, Popover, Table } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import axios from 'axios';

class GroupPage extends Component {
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
			    <style type="text/css">{`
				    .custom-rounded {
				        width: 10%;
				        height: 10%;
				    }
			    `}</style>
			    <Image src={source} bsClass='custom' rounded />     {name}
			</div>
		);
	}

	header() {
		const mp = (<Popover id="popover-trigger-hover-focus" title="Match Played"></Popover>);
		const win = (<Popover id="popover-trigger-hover-focus" title="Win"></Popover>);
		const draw = (<Popover id="popover-trigger-hover-focus" title="Draw"></Popover>);
		const lost = (<Popover id="popover-trigger-hover-focus" title="Lost"></Popover>);
		const gf = (<Popover id="popover-trigger-hover-focus" title="Goals For"></Popover>);
		const ga = (<Popover id="popover-trigger-hover-focus" title="Goals Against"></Popover>);
		const gd = (<Popover id="popover-trigger-hover-focus" title="Goal Difference"></Popover>);
		const pts = (<Popover id="popover-trigger-hover-focus" title="Points"></Popover>);
		return (
			<tr>
				<th className='text-center' width='200'>TEAM</th>
				<OverlayTrigger trigger='hover' placement='bottom' overlay={mp}>
					<th className='text-center'>MP</th>
				</OverlayTrigger>
				<OverlayTrigger trigger='hover' placement='bottom' overlay={win}>
					<th className='text-center'>W</th>
				</OverlayTrigger>
				<OverlayTrigger trigger='hover' placement='bottom' overlay={draw}>	
					<th className='text-center'>D</th>
				</OverlayTrigger>
				<OverlayTrigger trigger='hover' placement='bottom' overlay={lost}>	
					<th className='text-center'>L</th>
				</OverlayTrigger>
				<OverlayTrigger trigger='hover' placement='bottom' overlay={gf}>	
					<th className='text-center'>GF</th>
				</OverlayTrigger>
				<OverlayTrigger trigger='hover' placement='bottom' overlay={ga}>	
					<th className='text-center'>GA</th>
				</OverlayTrigger>
				<OverlayTrigger trigger='hover' placement='bottom' overlay={gd}>	
					<th className='text-center'>GD</th>
				</OverlayTrigger>
				<OverlayTrigger trigger='hover' placement='bottom' overlay={pts}>	
					<th className='text-center'>Pts</th>
				</OverlayTrigger>
			</tr>
		);
	}

	body(data) {
		return (
			<tr>
				<td>{this.imageStyle(data.flag, data.name)}</td>
				<td>{data.mp}</td>
				<td>{data.win}</td>
				<td>{data.draw}</td>
				<td>{data.lost}</td>
				<td>{data.gf}</td>
				<td>{data.ga}</td>
				<td>{data.gd}</td>
				<td>{data.points}</td>
			</tr>
		)
	}

	render() {
		const groupTable = this.state.group.map((data, index)=>{
			const character = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
			return(
				<div>
					<h3 className="w_header">GROUP {character[index]}</h3>
					<Table striped bordered condensed hover>
						<thead>
							{this.header()}
						</thead>
						<tbody>
							{this.body(data[0])}
							{this.body(data[1])}
							{this.body(data[2])}
							{this.body(data[3])}
						</tbody>
					</Table>
				</div>
			)
		});
		return (
			<div>{groupTable}</div>
		)
	}
}

export default GroupPage;