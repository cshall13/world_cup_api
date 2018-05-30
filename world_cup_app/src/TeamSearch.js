import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class TeamSearch extends Component {
	constructor() {
		super();
		this.state = {
			team: []
		}
	}

	componentDidMount() {
		const userSearchTerm = this.props.match.params.searchTerm;
		this.mount(userSearchTerm);
	}

	componentWillReceiveProps(newProps) {
		const newSearchTerm = newProps.match.params.searchTerm;
		this.mount(newSearchTerm);
	}

	mount(searchTerm) {
		const searchUrl = `http://localhost:4000/search/`;
		axios({
			method: "POST",
			url: searchUrl,
			data: {
				searchTerm
			}
		}).then((data)=>{
			this.setState({
				team: data.data.results
			})
		})
	}

	render() {
		const teams = this.state.team.map((data, index)=>{
			return(
				<div className="col-md-3">
					<Link to={`/team/${data.id}`}>
						<img className="search-image" src={`${data.flag}`} />
					</Link>
				</div>
			)
		})
		return(
			<div>
				{teams}
			</div>
		)	
	}
}

export default TeamSearch;