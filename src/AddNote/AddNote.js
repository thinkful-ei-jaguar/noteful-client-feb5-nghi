import React from 'react';
import PropTypes from 'prop-types';

import './AddNote.css';

class AddNote extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			note_name: '',
			content: '',
			folder_id: ''
		};
	}

	// first it mounts - from render
	// then run getDerivedStateFromProps 
	// runs render again bc props changed after fetch in app
	// will run everytime new props is received
	// if use context, and the context change, the component will rerun
	static getDerivedStateFromProps(props) {
		// Returns object
		// works like setting state ({})
		if(props.folders.length > 0)
			return {folder_id: props.folders[0].id};
			else return null;
	}

	submitNewNote = (e) => {
		const {note_name, content, folder_id} = this.state; 
		e.preventDefault();

		// Data validation
		if (note_name === '') {
			return alert('Please insert note name');
		}

		// Add note to api and state and retuns to homepage only if succesfully added
		this.props.addNote(note_name, content, folder_id, this.props.history);

		// Clears form
		this.setState({
			note_name: null,
			content: null,
			folder_id: null
		});
		
	};

	updateNoteName = (note_name) => {
		this.setState({note_name});
	}

	updatefolder_id = (folder_id) => {
		this.setState({folder_id});
	}

	updateNoteContent = (content) => {
		this.setState({content});
	}

	render() {
		return (
			<form className='Noteful-form' onSubmit={e => this.submitNewNote(e)} >
				<label htmlFor='NoteName'>Name:</label>
                <input type='text' id='NoteName' name='NoteName' placeholder='Note Name'
                    value={this.state.note_name || ''}
                    onChange={e=>this.updateNoteName(e.currentTarget.value)}/>
                <br />
				<label htmlFor='folder'>Select Folder:</label>
				<select 
					id='folder'
		            aria-label="Select Folder" 
		            name="folder" 
		            className="whiteBackground"
		            onChange={e=>this.updatefolder_id(e.currentTarget.value)}
		            >
	            	{this.props.folders.map((folder, index) => 
	            		<option
						key={index}
	            		value={folder.id || ''}>
	            		{'Folder: ' + folder.folder_name}
	            		</option>
	            	)}}
            	</select>
	            <br />
				<label htmlFor='text'>Notes:</label>
	            <textarea id='text' type='text' name='contentName' placeholder='Add some notes here..'
					value={this.state.content || ''}
	                onChange={e=>this.updateNoteContent(e.currentTarget.value)}></textarea>
	            <br />
                <div className='Noteful-form button'>
                        <button type='submit' onClick={e => this.submitNewNote(e)} >Add Note</button>
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