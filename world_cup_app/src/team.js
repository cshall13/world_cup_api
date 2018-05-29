import React, {Component} from 'react';
import axios from 'axios';
import {Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap';
class Team extends Component{
	constructor(){
		super();
		this.state={
			show: false,
			team: {},
			players: [],
			buttonClass: "btn btn-primary"
		}
    	this.handleShow = this.handleShow.bind(this);
    	this.handleClose = this.handleClose.bind(this);
	// this.addFav = this.addFav.bind(this);
	}

	handleClose() {
    	this.setState({ show: false });
  	}

  	handleShow() {
    	this.setState({ show: true });
  	}


	componentDidMount(){
		const tid = this.props.match.params.teamId;
		// console.log(tid);
		axios({
			method: 'POST',
			url: 'http://localhost:4000/team',
			data: {
				tid
			}
		}).then(receivedData=>{
			console.log(receivedData);
			this.setState({
				team: receivedData.data.team,
				players: receivedData.data.players
			})
		})
	}

	hoverData(data){
		return (<Popover id="popover-trigger-hover-focus" title={`${data.f_name} ${data.l_name}`}>
					Club: {data.club}
			</Popover>)
	}


	render(){
		const playerGK = this.state.players.map((data,index)=>{
			if(data.position == "GK"){
				return (
					<OverlayTrigger trigger='hover' placement='bottom' overlay={this.hoverData(data)}>
						<span className="player-names">
							<Glyphicon glyph="user" /> {data.l_name}, {data.f_name}
						</span>
					</OverlayTrigger>
				)
			}
		})

		const playerDF = this.state.players.map((data,index)=>{
			if(data.position == "DF"){
				return (
					<OverlayTrigger trigger='hover' placement='bottom' overlay={this.hoverData(data)}>
						<span className="player-names">
							<Glyphicon glyph="user" /> {data.l_name}, {data.f_name}
						</span>
					</OverlayTrigger>
				)
			}
		})

		const playerMF = this.state.players.map((data,index)=>{
			if(data.position == "MF"){
				return (
					<OverlayTrigger trigger='hover' placement='bottom' overlay={this.hoverData(data)}>
						<span className="player-names">
							<Glyphicon glyph="user" /> {data.l_name}, {data.f_name}
						</span>
					</OverlayTrigger>
				)
			}
		})

		const playerFW = this.state.players.map((data,index)=>{
			if(data.position == "FW"){
				return (
					<OverlayTrigger trigger='hover' placement='bottom' overlay={this.hoverData(data)}>
						<span className="player-names">
							<Glyphicon glyph="user" /> {data.l_name}, {data.f_name}
						</span>
					</OverlayTrigger>
				)
			}
		})

		const teamTable = this.state.team

		const background ={
			 backgroundImage:'url('+ teamTable.flag +')'
		}

		return(
			<div className="container">
				<div className="col-md-4">
					<h2>{teamTable.name}</h2>
					<img className="team-flag" src={teamTable.flag} />
					<h3> Rank: {teamTable.rank} </h3>
					<h3> Continent: {teamTable.continent} </h3>
				</div>
				<div className="col-md-8">
					<div className="custom-bg">
						<div className="row">
							<div className="col-md-8 col-md-offset-2" id="col-gk">
								<h2 className="position"> GK </h2>
								{playerGK}
							</div>
						</div>

						<div className="row">
							<div className="col-md-8 col-md-offset-2" id="col-df">
								<h2 className="position"> DF </h2>
								{playerDF}
							</div>
						</div>
						
						<div className="row">
							<div className="col-md-8 col-md-offset-2" id="col-mf">
								<h2 className="position"> MF </h2>
								{playerMF}
							</div>
						</div>	

						<div className="row">
							<div className="col-md-8 col-md-offset-2" id="col-fw">
								<h2 className="position"> FW </h2>
								{playerFW}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Team;	