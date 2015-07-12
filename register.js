import React from 'react';
import mui from 'material-ui';

import Welcome from './welcome';
import Information from './information';
import Confirmation from './confirmation';

var {Tabs, Tab} = mui;

var ThemeManager = new mui.Styles.ThemeManager();
var {Colors} = mui.Styles;

const Register = React.createClass({
	getDefaultProps(){
		return {
			labels:{
				welcome: 'Admission Process',
				information: 'The application & Interview',
				confirmation: 'Confirmation & Getting started'
			}
		}
	},

	childContextTypes: {
	    muiTheme: React.PropTypes.object
  	},

  	getChildContext() {
	    return {
	      muiTheme: ThemeManager.getCurrentTheme()
	    };
  	},

  	componentWillMount() {
	    ThemeManager.setPalette({
	      accent1Color: Colors.deepOrange500
	    });
  	},

  	_moveToNextTab(){
  		debugger
  		var tabs = Tabs;


  	},

  	_handleTabsChange(index, tab){
  		debugger
  		if (index === 1) {
  			var state = this.props.selectedIndex
  		}
  		console.log(index, tab);
  	},

  	_handleTabChange(tab){
  		
  		var tabs = tabs;
  	},
	render(){
		return (
			<Tabs onChange={this._handleTabsChange}> 
				<Tab label={this.props.labels.welcome} disabled={false}>
			  		<Welcome/>
		  		</Tab>
		  		<Tab label={this.props.labels.information} onActive={this._handleTabChange} disabled={false}>
			  		<Information moveToNextTab={this._moveToNextTab}/>
		  		</Tab>
		  		<Tab label={this.props.labels.confirmation} disabled={true}>
			  		<Confirmation/>
		  		</Tab>
			</Tabs>
		);
	}
});

module.exports = Register;