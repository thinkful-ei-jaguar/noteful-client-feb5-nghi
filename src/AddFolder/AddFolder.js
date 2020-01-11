import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import CircleButton from '../CircleButton/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    <CircleButton
                        to='/'
                        type='button'
                        className='AddFolder_add-note-button'
                        onClick={e => this.submitNewFolder(e)}
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
                        Folder
                    </CircleButton>
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