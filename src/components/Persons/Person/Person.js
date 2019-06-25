import React, {Component} from "react";
import classes from "./Person.css";
import withClass from "../../../hoc/withClass";
import Aux from "../../../hoc/Aux";
import PropTypes from "prop-types";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
    constructor(props) {
        super(props)
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log("[Person.js] rendering...")
        return (
            <Aux>
                {this.context.authenticated ? (<p>Authenticated!</p>) : (<p>Please log in</p>)}
            {/* <div className={classes.Person}> */}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input ref={this.inputElementRef} type="text" onChange={this.props.changed} value={this.props.name}/>
            {/* </div> */}
            </Aux>
        );
    }
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);
