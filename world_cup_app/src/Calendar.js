import React, { Component } from 'react';
import axios from 'axios';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import swal from 'sweetalert2';
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
				id: index,
				title: title,
				allDay: false,
				start: new Date(2018, data.month - 1, data.date),
				end: new Date(2018, data.month - 1, data.date),
				home: data.home,
				away: data.away,
				home_logo: data.home_logo,
				away_logo: data.away_logo,
				stadium: data.name,
				city: data.city,
				image: data.image,
				time: data.localTime
			}
		})

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
				    	function getMonth(month) {
				    		if(month === 5) return 'June';
				    		else if(month === 6) return 'July';
				    	}

				    	function getDay(day) {
				    		if(day === 0) return 'Sun';
				    		else if(day === 1) return 'Mon';
				    		else if(day === 2) return 'Tue';
				    		else if(day === 3) return 'Wed';
				    		else if(day === 4) return 'Thu';
				    		else if(day === 5) return 'Fri';
				    		else if(day === 6) return 'Sat';
				    	}
				    	
				    	let matchTitle;
				    	if(e.home_logo == null || e.away_logo == null) 
				    		matchTitle = `<span class="match-title">${e.title}</span>`;
				    	else
				    		matchTitle = (
				    			`<img src=${e.home_logo} height="60" width="60"/>&ensp;
								  <span class="match-title">${e.title}</span>&ensp;
								  <img src=${e.away_logo} height="60" width="60"/>`
				    		);

						swal({
							html: `${matchTitle}<br>
								  <img class="sm-stadium-image" src=${e.image} /><br>
								  <span class="match-info">${e.city}, ${e.stadium} @${getDay(e.start.getDay())} ${getMonth(e.start.getMonth())} ${e.start.getDate()} ${e.time}</span>`
						});
				    }}
			    />
			</div>
		)
	}
}

export default Calendar;