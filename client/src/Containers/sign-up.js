import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			redirect: false
		}
	}
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit = (event) => {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			email: this.state.email,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirect: true
					})
				} else {
					console.log(response.data.error)
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}

	renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />
    }
  }

render() {
	return (
		<div className="SignupForm">
			{this.renderRedirect()}
			<h4>Sign up</h4>
			<form className="form-horizontal">
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="username">Username</label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							type="text"
							id="username"
							name="username"
							placeholder="Username"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="firstname">Firstname: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="firstname"
							type="firstname"
							name="firstname"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="lastname">Lastname: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="lastname"
							type="lastname"
							name="lastname"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="email">email: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="email"
							type="email"
							name="email"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="password">Password: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="password"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group ">
					<div className="col-7"></div>
					<button
						className="btn btn-primary col-1 col-mr-auto"
						onClick={this.handleSubmit}
						type="submit"
					>Sign up</button>
				</div>
			</form>
		</div>
	)
}
}

export default Signup
