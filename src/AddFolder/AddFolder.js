import React from 'react';
import {Link} from 'react-router-dom';
import CircleButton from '../CircleButton/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AddFolder extends React.Component {
    state = {
        name: '',
        id: 'abc'
    };

    submitNewFolder = (e) => {
        // Prevents from from reloading
        e.preventDefault();
        // Updates folder list
        this.props.addFolder(this.state.name, this.state.id);
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
                        tag={Link}
                        to='/'
                        type='button'
                        className='AddFolder_add-note-button'
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