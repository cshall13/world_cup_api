import React, {Component} from 'react';
import {NavItem, Glyphicon} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Favorites extends Component{

	constructor(){
		super();
		this.state={
			favs: [""],
			token: localStorage.getItem('token')
		}
		// this.handleFavs = this.handleFavs.bind(this);
	}

	componentDidMount(){
		// event.preventDefault();

		const getFavs = axios({
			method: "POST",
			url: "http://localhost:4000/favorites",
			data:{
				token: this.state.token
			}
		}).then((data)=>{
			if(data.data.msg == "modal"){
				this.setState({
					favs: data.data.teams
				})
				// console.log(this.state.favs[0].name)
			}else{
				console.log("No Favorites");
				this.props.history.push('/register')
			}
		})
	}

	render(){

		const favList = this.state.favs.map((data, index)=>{
			return(
				<li className="fav_teams">
					<Link to={`/team/${data.id}`} >
						<div className="row">
							<div className="col-md-4">
								<img className="favs-image"src={data.logo} />
							</div>
							<div className="col-md-4">
								<h2>{data.name}</h2>
							</div>
						</div>
						<hr />	
					</Link>


				</li>
			)
		})

		return(
			<span>
				<span data-toggle="modal" data-target="#myModal">
					<Glyphicon glyph="thumbs-up" /> Favorites
				</span>

				<div className="modal fade" id="myModal" role="dialog">
				    <div className="modal-dialog modal-md">
				      <div className="modal-content">
				        <div className="modal-header">
				          <button type="button" className="close" data-dismiss="modal">&times;</button>
				         	<h2 className="modal-title">Favorites</h2>
				        </div>
				        <div className="modal-body">
				          	<ul>{favList}</ul>
				        </div>
				        <div className="modal-footer">
				          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
				        </div>
				      </div>
				    </div>
				  </div>
			</span>
		)
	}
}

export default Favorites;