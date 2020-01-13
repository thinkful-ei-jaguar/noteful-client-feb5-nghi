import React from 'react';
import PropTypes from 'prop-types';

import './AddFolder.css';

class AddFolder extends React.Component {
    state = {
        name: ''
    };

    submitNewFolder = (e) => {
        // Prevents from from reloading
        e.preventDefault();
        // Updates folder list and return to homepage
        this.props.addFolder(this.state.name, this.props.history);
        // Resets state
        this.setState({name: ''});
    }

    updateState = (name) => {
        this.setState({name});
    }

    render() {
        return (
            <form onSubmit={e => this.submitNewFolder(e)} >
                <input type='text' name='folderName' placeholder='Folder Name'
                    value={this.state.name}
                    onChange={e=>this.updateState(e.currentTarget.value)}/>
                <div className='AddFolder__button-container'>
                        <button type='submit' onClick={e => this.submitNewFolder(e)} >Folder</button>
                </div>
            </form>
        );
    }
}

AddFolder.propTypes = {
    history: PropTypes.object.isRequired,
    addFolder: PropTypes.func.isRequired
}; 

export default AddFolder;