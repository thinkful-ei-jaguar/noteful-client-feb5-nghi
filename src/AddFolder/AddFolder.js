import React from 'react';
import {Link} from 'react-router-dom';
import CircleButton from '../CircleButton/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AddFolder extends React.Component {
    state = {
        name: ''
    };

    submitNewFolder = (e) => {
        // Prevents from from reloading
        e.preventDefault();
        // Updates folder list
        this.props.addFolder(this.state.name);
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

export default AddFolder;