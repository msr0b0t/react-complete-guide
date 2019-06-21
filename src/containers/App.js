import React, {Component} from "react";
import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

class App extends Component {
	state = {
		persons: [
			{id: "0", name: "Max", age: 28},
			{id: "1", name: "Manu", age: 29},
			{id: "2", name: "Stephanie", age: 26}
		],
		otherState: "some other value",
		showPersons: false
	};

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

		this.setState({persons: persons});
	}

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({showPersons: !doesShow});
	}

	render() {
		let persons = null;

		if (this.state.showPersons) {
			persons = <Persons
				persons={this.state.persons}
				clicked={this.deletePersonHandler}
				changed={this.nameChangeHandler}/>;
		}

		return (
			<div className={classes.App}>
				<Cockpit
					showPersons={this.state.showPersons}
					persons={this.state.persons}
					clicked={this.togglePersonsHandler}/>
				{persons}
			</div>
		);
	}
}

export default App;
