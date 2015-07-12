import React from 'react';
import mui from 'material-ui';

const {RaisedButton, FontIcon, TextField, RadioButtonGroup, RadioButton, Checkbox} = mui;

const Information = React.createClass({
	getDefaultProps(){
		return {
			bootcamps: [
				{
					value: 'Sept 14th - Sept 19th',
					label: 'Sept 14th - Sept 19th'
				},
				{
					value: 'Sept 28th - Oct 3rd',
					label: 'Sept 28th - Oct 3rd'
				},
				{
					value: 'Oct 12th - Oct 17th',
					label: 'Oct 12th - Oct 17th',
				},
				{
					value: 'Oct 26th - Oct 31st',
					label: 'Oct 26th - Oct 31st'
				}
			]
		}
	},
	getInitialState(){
		return {
			programming_language: '',
			jobTitle: '',
			selectedBootcamp: this.props.bootcamps[0],
			isFreelance: ''
		};
	},
	_handlePgrogrammingLanguage(event){
		console.log(event.target.value);
		this.setState({
			programming_language: event.target.value
		});
	},

	_handleJobTitle(event){
		this.setState({
			jobTitle: event.target.value
		});
	},

	_handleIsFreelance(event){
		console.log(event.target)
		this.setState({
			isFreelance: event.target.value
		});
	},
	_handleSubmit(event){
		console.log(event);
	},
	render(){
		var Sessions = this.props.bootcamps.map((bc) => {
			return (<RadioButton key={bc.value}
			          value={bc.value}
			          label={bc.label}>
          			</RadioButton>);
		});


		return (
		    <div style={{marginLeft: 150, marginTop: 75}}> 
		       <p>
				  <RaisedButton linkButton={true} href="http://127.0.0.1:9000/auth/github" secondary={true} label="Register with Github">
				    <FontIcon className="muidocs-icon-custom-github"/>
				  </RaisedButton>
				</p>
		      	<p> 
			        <TextField
					  hintText="Primary programming language"
					  value={this.state.programming_language}
					  onChange={this._handlePgrogrammingLanguage}>
				  	</TextField>
		      	</p> 
		      	<p> 
			        <TextField
					  hintText="Job title"
					  value={this.state.jobTitle}
					  onChange={this._handleJobTitle}>
				  	</TextField>
		      	</p>
		      	<p>
		      		<Checkbox
				        name="freelance"
				        value={this.state.isFreelance}
				        label="Are you a freelance?" onCheck={this._handleIsFreelance}/>
		      	</p> 
		      	<p> 
			      	<label>Session preferences</label>
			        <RadioButtonGroup name="session" defaultSelected={this.props.bootcamps[0].value}>
				        {Sessions}
			      	</RadioButtonGroup>
		      	</p>
		      	<p>
				  <RaisedButton secondary={true} label="Continue" onClick={this.props.moveToNextTab}>
				    <FontIcon className="muidocs-icon-custom-github"/>
				  </RaisedButton>
				</p> 
		    </div> 
		);
	}
});

module.exports = Information;