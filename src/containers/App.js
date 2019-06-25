import React, {Component} from "react";
import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from "../hoc/withClass";
import Aux from "../hoc/Aux";
import AuthContext from "../context/auth-context";

class App extends Component {
	constructor(props) {
		super(props);
		console.log("[App.js] constructor");
	}

	state = {
		persons: [
			{id: "0", name: "Max", age: 28},
			{id: "1", name: "Manu", age: 29},
			{id: "2", name: "Stephanie", age: 26}
		],
		otherState: "some other value",
		showPersons: false,
		showCockpit: true,
		changeCounter: 0,
		authenticated: false
	};

	static getDerivedStateFromProps(props, state) {
		console.log("[App.js] getDerivedStateFromProps", props);
		return state;
	}

	// componentWillMount() {
	// 	console.log("[App.js] componentWillMount");
	// }

	componentDidMount() {
		console.log("[App.js] componentDidMount");
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log("[App.js] shouldComponentUpdate");
		return true;
	}

	componentDidUpdate() {
		console.log("[App.js] componentDidUpdate");
	}

	deletePersonHandler = (personIndex) => {
		// const persons = this.state.persons.slice();
		//alternative
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({persons: persons});
	}

	nameChangeHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex(p => {
			return p.id === id;
		});

		const person = {...this.state.persons[personIndex]};

		person.name = event.target.value;

		const persons = [...this.state.persons];
		persons[personIndex] = person;

		this.setState((prevState, props) => {
			return {persons: persons, changeCounter: this.state.changeCounter + 1};
		});
	}

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({showPersons: !doesShow});
	}

	loginHandler = () => {
		this.setState({authenticated: true});
	}

	render() {
		console.log("[App.js] render");
		let persons = null;

		if (this.state.showPersons) {
			persons = <Persons
				persons={this.state.persons}
				clicked={this.deletePersonHandler}
				changed={this.nameChangeHandler}
				isAuthenticated={this.state.authenticated}
			/>;
		}

		return (
			<Aux>
				<button onClick={() => this.setState({showCockpit: false})}>Remove Cockpit</button>
				<AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
					{this.state.showCockpit ?
						(<Cockpit
							title = {this.props.appTitle}
							showPersons={this.state.showPersons}
							persons={this.state.persons}
							clicked={this.togglePersonsHandler}
						/>) : null}
					{persons}
				</AuthContext.Provider>
			</Aux>
		);
	}
}

export default withClass(App, classes.App);
