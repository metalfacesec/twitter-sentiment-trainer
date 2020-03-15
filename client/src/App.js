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
		this.clickNegative = this.clickNegative.bind(this);
		this.clickPass = this.clickPass.bind(this);
		this.clickPositive = this.clickPositive.bind(this);

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
		axios.post('http://localhost:3000/rate_tweet', { positive: true, text: this.state.sentance });
		this.showRandomSentace();
	}
	clickNegative() {
		axios.post('http://localhost:3000/rate_tweet', { positive: false, text: this.state.sentance });
		this.showRandomSentace();
	}
	clickPass() {
		this.showRandomSentace();
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
				<div style={{height: "50px"}}></div>
				<div className="row">
					<div className="col-3"></div>
					<div className="col-2 text-center">
						<button type="button" class="btn btn-danger" onClick={this.clickNegative}>Negative</button>
					</div>
					<div className="col-2 text-center">
						<button type="button" class="btn btn-secondary" onClick={this.clickPass}>Pass</button>
					</div>
					<div className="col-2 text-center">
						<button type="button" class="btn btn-success" onClick={this.clickPositive}>Positive</button>
					</div>
					<div className="col-3"></div>
				</div>
			</div>
    );
  }
}

export default App;
