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
        if(this.state.name === '') {
            return alert('Please insert folder name');
        }
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
            <form className='Noteful-form' onSubmit={e => this.submitNewFolder(e)} >
                <label htmlFor='folderName'>Name:</label>
                <input type='text' id='folderName' name='folderName' placeholder='Folder Name'
                    value={this.state.name}
                    onChange={e=>this.updateState(e.currentTarget.value)}/>
                <div className='Noteful-form button'>
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