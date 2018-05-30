import React, { Component } from 'react';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';

class Calendar extends Component {
	constructor() {
		const today = new Date();
		super();
		this.state = {
			matches: [],
			date: new Date(today.getFullYear(), today.getMonth(), today.getDate())
		}
		BigCalendar.momentLocalizer(moment);
	}

	componentDidMount() {
		const url = 'http://localhost:4000/calendar';
		const request = axios.get(url);
		request.then(receivedData=>{	
			this.setState({
				matches: receivedData.data.data 
			})
		})
		
	}

	render() {
		const mp = (<Popover id="popover-trigger-hover-focus" title="Match Played"></Popover>);
		const events = this.state.matches.map((data, index)=> {
			let title;
			if(data.home === 'null' || data.home === 'null') title = data.type;
			else title = data.home + ' vs ' + data.away;
			return {
				title: title,
				allDay: false,
				start: new Date(2018, data.month - 1, data.date),
				end: new Date(2018, data.month - 1, data.date)
			}
		})
		console.log(events);
		return (
			<div className="calendar-container">
				<BigCalendar
					events={events}
				    view='month'
				    views={['month']}
				    date={this.state.date}
				    onNavigate={(date)=>{
				      	this.setState({date: date})
				    }}
				    onSelectEvent={(e,se)=>{
				    	return mp;
				  //   	const oldEl = document.getElementsByClassName('game-start');
				  //   	if(oldEl[0]){
				  //   		oldEl[0].remove();
				  //   	}
				  //   	const gameEl = se.target; 
				  //   	console.dir(gameEl);
				  //   	const gameStartTime = e.start;
				  //   	const parentEl = gameEl.parentNode;
				  //   	console.dir (parentEl)

				  //   	let gameStartEl = document.createElement("div");
						// gameStartEl.innerHTML = gameStartTime;
						// gameStartEl.className = "game-start";
				  //   	parentEl.insertBefore(gameStartEl,parentEl.childNodes[0])
				    }}
			    />
			</div>
		)
	}
}

export default Calendar;