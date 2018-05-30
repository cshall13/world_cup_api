import React, {Component} from 'react';
import axios from 'axios';
import {Glyphicon, Popover, OverlayTrigger} from 'react-bootstrap';
import Favorites from './favorites'
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
		this.addFav = this.addFav.bind(this);
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
			// console.log(receivedData);
			this.setState({
				team: receivedData.data.team,
				players: receivedData.data.players
			})
		})
	}

	hoverData(data){
		// console.log(this.state.team)
		return (<Popover id="popover-trigger-hover-focus" title={`${data.f_name} ${data.l_name}`}>
					Club: {data.club}
			</Popover>)
	}


	addFav(){
    	const teamId = this.state.team.id;
    	const addFavorite = axios({
    		method: 'POST',
    		url: `http://localhost:4000/addFav`,
    		data:{
    			teamId,
    			token: localStorage.getItem('token')
    		}
    	})
    	addFavorite.then((favoriteResponse)=>{
    		// console.log(favoriteResponse.data)
    		// if Express tells me: {msg:"favAdded"}...
    		if(favoriteResponse.data.msg === "favAdded"){
    			this.setState({
    				buttonClass: "btn btn-success"
    			})
    		}else if(favoriteResponse.data.msg === "badToken"){
    			// tell the user to login
    			// or send them to /login
    			this.props.history.push('/login')
    		}
    	})
    }


	render(){
		const playerGK = this.state.players.map((data,index)=>{
			if(data.position === "GK"){
				return (
					<OverlayTrigger trigger='hover' placement='bottom' overlay={this.hoverData(data)}>
						<span className="player-names">
							<i className="fas fa-tshirt"></i> {data.l_name}, {data.f_name}
						</span>
					</OverlayTrigger>
				)
			}
		})

		const playerDF = this.state.players.map((data,index)=>{
			if(data.position === "DF"){
				return (
					<OverlayTrigger trigger='hover' placement='bottom' overlay={this.hoverData(data)}>
						<span className="player-names">
							<i className="fas fa-tshirt"></i> {data.l_name}, {data.f_name}
						</span>
					</OverlayTrigger>
				)
			}
		})

		const playerMF = this.state.players.map((data,index)=>{
			if(data.position === "MF"){
				return (
					<OverlayTrigger trigger='hover' placement='bottom' overlay={this.hoverData(data)}>
						<span className="player-names">
							<i className="fas fa-tshirt"></i> {data.l_name}, {data.f_name}
						</span>
					</OverlayTrigger>
				)
			}
		})

		const playerFW = this.state.players.map((data,index)=>{
			if(data.position === "FW"){
				return (
					<OverlayTrigger trigger='hover' placement='bottom' overlay={this.hoverData(data)}>
						<span className="player-names">
							<i className="fas fa-tshirt"></i> {data.l_name}, {data.f_name}
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
				<div className='teamName col-md-4'>
					<img className="team-flag" src={teamTable.flag} />
					<h2>{teamTable.name}</h2>
					<h3> Manager: {teamTable.l_name} {teamTable.f_name}</h3>
					<h3> Rank: {teamTable.rank} </h3>
					<h3> Continent: {teamTable.continent} </h3>
					<button className={this.state.buttonClass} onClick={this.addFav}>Add to Favorites</button>
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