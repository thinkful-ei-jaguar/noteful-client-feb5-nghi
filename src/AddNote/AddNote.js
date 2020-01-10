import React from 'react';
import CircleButton from '../CircleButton/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AddNote.css';

class AddNote extends React.Component {
	state = {
		name: null,
		content: null,
		folderName: null
	};

	submitNewNote = (e) => {
		const {name, content, folderName} = this.state; 
		e.preventDefault();

		if (name === null) {
			return alert('Please insert note name');
		}

		// Find folder ID
		const folder = this.props.folders.find(folder => folder.name === folderName);

		// Add note to api and state
		this.props.addNote(name, content, folder.id);

		// Clears form
		this.setState({
			name: null,
			content: null,
			folderName: null
		});
	}

	updateNoteName = (name) => {
		this.setState({name});
	}

	updateFolderName = (folderName) => {
		this.setState({folderName});
	}

	updateNoteContent = (content) => {
		this.setState({content});
	}

	coolbackground = {
	color: 'yellow'
	};

	render() {
		return (
			<form onSubmit={e => this.submitNewNote(e)} >
                <input type='text' name='NoteName' placeholder='Note Name'
                    value={this.state.name}
                    onChange={e=>this.updateNoteName(e.currentTarget.value)}/>
                <br />
                <input type='text' name='FolderName' placeholder='Folder Name'
	                value={this.state.folderName}
	                onChange={e=>this.updateFolderName(e.currentTarget.value)}/>
	            <br />
	            <select aria-label="Select Folder" name="folder" id="selectFolderToInsertNote">
	            	{this.props.folders.map(folder => 
	            		<option 
	            		styles={this.coolbackground}
	            		value={folder.id}>
	            		{folder.name}
	            		</option>
	            	)}}
            	</select>
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

export default AddNote;