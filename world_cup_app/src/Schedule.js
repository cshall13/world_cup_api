import React, { Component } from 'react';
import { Col, Glyphicon, Grid, Image, Panel, PanelGroup, Row } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import axios from 'axios';

class Schedule extends Component {
	constructor() {
		super();
		this.state = {
			activeKey: '0',
			data: []
		}
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount() {
		console.log('The component has mounted!');
		const url = 'http://localhost:4000/schedule';
		const request = axios.get(url);
		request.then(receivedData=>{	
			this.setState({
				data: receivedData.data.data 
			})
		})
	}

	handleSelect(activeKey) {
		this.setState({activeKey})
	}

	imageStyle(source) {
		bootstrapUtils.addStyle(Image, 'custom');
		return (
			<div className="image-wrapper">
			    <style type="text/css">{`
				    .custom-rounded {
				        width: 15%;
				        height: 10%;
				    }
			    `}</style>
			    <Image src={source} bsClass='custom' rounded />
			</div>
		);
	}

	stage(type) {
		if(type === 'GR') return 'Group Stage';
		else if(type === 'R16') return 'Round of 16';
		else if(type === 'QT') return 'Quater-final';
		else if(type === 'SF') return 'Semi-final';
		else if(type === 'T3') return 'Third place match';
		else if(type ==='FN') return 'Final';
	}


	// matchinfo(data, index) {
	// 	return (
	// 		<Panel eventKey={`"${index}"`}>
	// 			<Panel.Heading className="custom-heading">
	// 				<Panel.Title className="custom-title" toggle><Glyphicon glyph="chevron-down" className="arrow" /></Panel.Title>
	// 			</Panel.Heading>
	// 			<Panel.Body collapsible>
	// 				<img className="stadium-image" src={data.image} />
	// 			</Panel.Body>
	// 		</Panel>
	// 	)
	// }

	singleSchedule(data, index) {
		return (
			<div>
				{ data.home !== 'null' && data.away !== 'null' &&
					<Row>
						<Col xs={6} md={2}>
							<ul className='info-list text-left'>
								<li>{this.stage(data.type)}</li>
								<li>{data.name}</li>
								<li>{data.city}</li>
							</ul>
						</Col>
						<Col xs={6} md={3}>
							<h3 className="s-info">{this.imageStyle(data.home_logo)}   {data.home}</h3>
						</Col>
						<Col xs={6} md={1}>
							<h3 className="s-info">{data.localTime}</h3>
						</Col>
						<Col xs={6} md={3}>
							<h3 className="s-info">{this.imageStyle(data.away_logo)}   {data.away}</h3>
						</Col>
					</Row>
				} { data.home === 'null' && data.away === 'null' &&
					<Row>
						<Col xs={6} md={2}>
							<ul className='info-list text-left'>
								<li>{this.stage(data.type)}</li>
								<li>{data.name}</li>
								<li>{data.city}</li>
							</ul>
						</Col>
						<Col xs={6} md={3}></Col>
						<Col xs={6} md={1}>
							<h3 className="s-info">{data.localTime}</h3>
						</Col>
						<Col xs={6} md={3}></Col>
					</Row>
				}
			</div>	
		)
	}

	render() {
		const scheduleTable = this.state.data.map((data, index)=>{
			return (
				<div>
					{ index === 0 &&
						<div>
							<h3 className='w_header text-left'>{data.month} {data.date}</h3>
							<hr className="line-split"/>
						</div>
					} { index > 0 && this.state.data[index].date !== this.state.data[index - 1].date &&
						<div>
							<h3 className='w_header text-left'>{data.month} {data.date}</h3>
							<hr className="line-split"/>
						</div>
					}
					{/*<Grid>*/}
					{this.singleSchedule(data, index)}
					{/*</Grid>*/}
					{/*this.matchinfo(data, index)*/}
				</div>
			);
		});
		console.log(this.state.data);
		return (
			<div className='schedule-container' text-center>
				{/*<PanelGroup accordian activeKey={this.state.activeKey} onSelect={this.handleSelect}>*/}
					{scheduleTable}
				{/*</PanelGroup>*/}
			</div>
		)
	}
}

export default Schedule;