// import React from 'react';
// //import 'font-awesome/css/font-awesome.css';
// //import 'materialize-css/bin/materialize.css';
// import mui from 'material-ui';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// var ThemeManager = new mui.Styles.ThemeManager();
// var {DropDownMenu} = mui;

// var {Colors} = mui.Styles;

// injectTapEventPlugin();


// let menuItems = [
//    { payload: '1', text: 'Now' },
//    { payload: '2', text: 'Every Night' },
//    { payload: '3', text: 'Weeknights' },
//    { payload: '4', text: 'Weekends' },
//    { payload: '5', text: 'Weekly' },
// ];


// var RadioGroup = React.createClass({
// 	childContextTypes: {
// 	    muiTheme: React.PropTypes.object
//   	},

//   	getChildContext() {
// 	    return {
// 	      muiTheme: ThemeManager.getCurrentTheme()
// 	    };
//   	},

//   	componentWillMount() {
// 	    ThemeManager.setPalette({
// 	      accent1Color: Colors.deepOrange500
// 	    });
//   	},

// 	getInitialState(){
// 		return {
// 			selectedValue: 'red'
// 		};
// 	},
// 	onChange(value){
// 		console.log(value)
// 		this.setState({
// 			selectedValue: value
// 		});
// 	},


// 	render(){
// 		return (
// 			<DropDownMenu menuItems={menuItems} />
// 			// <form action="#">
// 			//     <p>
// 			//       <input name="session" type="radio" checked={this.state.selectedValue === 'red'} onChange={this.onChange.bind(this, 'red')}/>
// 			//       <label htmlFor="test1">Red</label>
// 			//     </p>
// 			//     <p>
// 			//       <input name="session" type="radio" checked={this.state.selectedValue === 'yellow'} onChange={this.onChange.bind(this, 'yellow')}/>
// 			//       <label htmlFor="test2">Yellow</label>
// 			//     </p>
// 			//   </form>
// 		);
// 	}
// });

// React.render(<RadioGroup/>, document.body);

// var StatesField = React.createClass({
// 	getDefaultProps: function () {
// 		return {
// 			searchable: true,
// 			label: 'Choose your primary programming language:'
// 		};
// 	},
// 	getInitialState: function() {
// 		return {
// 			country: 'AU',
// 			disabled: false,
// 			selectValue: 'Python'
// 		};
// 	},
// 	updateValue: function(newValue) {
// 		logChange('State changed to ' + newValue);
// 		this.setState({
// 			selectValue: newValue || null
// 		});
// 	},
// 	render: function() {
// 		var ops = [
// 					{value: 'JavaScript', label: 'JavaScript'}, 
// 					{value: 'Haskell', label: 'Haskell'}, 
// 					{value: 'C#', label: 'C#'},
// 					{value: 'Python', label: 'Python'}
// 				];

// 		return (
// 			<div>
// 				<label>{this.props.label}</label>
// 				<Select ref="stateSelect" options={ops} disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue} searchable={this.props.searchable} />
// 			</div>
// 		);
// 	}});

// var MultiSelectField = React.createClass({
// 	getInitialState: function() {
// 		return {
// 			disabled: false,
// 			value: []
// 		};
// 	},
// 	handleSelectChange: function(value, values) {
// 		logChange('New value:', value, 'Values:', values);
// 		this.setState({ value: value });
// 	},
// 	toggleDisabled: function(e) {
// 		this.setState({ 'disabled': e.target.checked });
// 	},
// 	render: function() {
// 		var ops = [
// 			{ label: 'Chocolate', value: 'chocolate' },
// 			{ label: 'Vanilla', value: 'vanilla' },
// 			{ label: 'Strawberry', value: 'strawberry' },
// 			{ label: 'Caramel', value: 'caramel' },
// 			{ label: 'Cookies and Cream', value: 'cookiescream' },
// 			{ label: 'Peppermint', value: 'peppermint' }
// 		];
// 		return (
// 			<span>
// 				<div>
// 					<label>{this.props.label}</label>
// 					<Select multi={true} disabled={this.state.disabled} value={this.state.value} placeholder="Select your favourite(s)" options={ops} onChange={this.handleSelectChange} />
// 				</div>
// 				<div>
// 					<input type="checkbox" checked={this.state.disabled} id="disable-multiselect" onChange={this.toggleDisabled}/>
// 					<label htmlFor="disable-multiselect">Disable</label>
// 				</div>
// 			</span>
// 		);
// 	}});

import React from 'react';
import Select from 'react-select';
import mui from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './app.css';
import Register from './register';

injectTapEventPlugin();

React.render(<Register/>, document.body);
