import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			sentance: ''
		}

		this.showRandomSentace = this.showRandomSentace.bind(this);
		this.getRandomSentance = this.getRandomSentance.bind(this);

		this.showRandomSentace();
	}

	async showRandomSentace() {
		let text = await this.getRandomSentance();
		this.setState({ sentance: text});
		console.log(this.state);
	}

	async getRandomSentance() {
		let response = await axios.get('http://localhost:3000/random_tweet');

		return response.data.text;
	}
	clickPositive() {

	}
	clickNegative() {

	}
	clickPass() {

	}
	render() {
		return (
			<div className="container" style={{marginTop: '50px', marginBottom: '50px'}}>
				<div className="row">
					<div className="col-1">&nbsp;</div>
					<div className="col-10" style={{textAlign: 'center'}}>
						<h3>{this.state.sentance}</h3>
					</div>
					<div className="col-1">&nbsp;</div>
				</div>
			</div>
    );
  }
}

export default App;
