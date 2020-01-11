import React from 'react';
import CircleButton from '../CircleButton/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

import './AddNote.css';

class AddNote extends React.Component {
	state = {
		name: null,
		content: null,
		folderId: null
	};

	submitNewNote = (e) => {
		const {name, content, folderId} = this.state; 
		e.preventDefault();

		// Data validation
		if (name === null) {
			return alert('Please insert note name');
		}

		// Add note to api and state and retuns to homepage only if succesfully added
		this.props.addNote(name, content, folderId, this.props.history);

		// Clears form
		this.setState({
			name: null,
			content: null,
			folderId: null
		});
	}

	updateNoteName = (name) => {
		this.setState({name});
	}

	updateFolderId = (folderId) => {
		this.setState({folderId});
	}

	updateNoteContent = (content) => {
		this.setState({content});
	}

	render() {
		return (
			<form onSubmit={e => this.submitNewNote(e)} >
                <input type='text' name='NoteName' placeholder='Note Name'
                    value={this.state.name}
                    onChange={e=>this.updateNoteName(e.currentTarget.value)}/>
                <br />
                <label className="whiteBackground" htmlFor="folder">Select Folder:</label>
	            <br />
	            <select 
		            aria-label="Select Folder" 
		            name="folder" 
		            className="whiteBackground"
		            onChange={e=>this.updateFolderId(e.currentTarget.value)}
		            >
	            	{this.props.folders.map(folder => 
	            		<option 
	            		value={folder.id}>
	            		{folder.name}
	            		</option>
	            	)}}
            	</select>
	            <br />
	            <input type='text' name='contentName' placeholder='Add some notes here..'
	                value={this.state.content}
	                onChange={e=>this.updateNoteContent(e.currentTarget.value)}/>
	            <br />
                <div className='AddNote__button-container'>
                    <CircleButton
                        to='/'
                        type='button'
                        className='AddNote_add-note-button'
                        onClick={e => this.submitNewNote(e)}
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
                        Note
                    </CircleButton>
                </div>
            </form>
			);
	}
}

// Specified required prop type
AddNote.propTypes = {
	addNote: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	folders: PropTypes.array.isRequired
};

export default AddNote;