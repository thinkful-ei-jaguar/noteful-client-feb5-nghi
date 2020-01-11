
import React from 'react';
import './Error.css';

// Component to handle error boundaries
class Error extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		};
	}

	// Lifecycle methods to indicate error exist if error returns
	static getDerivedStateFromError(error) {
		return {hasError: true};
	}

	render() {
		// Tell user of error instead of crashing
		if(this.state.hasError) {
			return (<p className='Error'>Could not display list</p>);
		}
		return this.props.children;
	}

}

export default Error;