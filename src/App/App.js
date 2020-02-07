import React, {Component} from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import Error404 from '../Error/Error404';
import Error from '../Error/Error';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import config from '../config';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: [],
        error: null
    };

    addFolder = (folderName, history) => {
        // Creates new object as the Post request body
        const newFolder = {
            folder_name: folderName};

        // Add folder to API
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFolder)
        })
        .then(res => res.ok ? res.json() : Promise.reject('Cannot make new folder'))
        .then(data => 
            // Go back to homepage when posted successfully
            history.push('/')
            )
        .catch(error => this.setState({error}));

        // Add folder to state
        this.setState({
            folders: [...this.state.folders, newFolder]
            });
    };

    addNote = (note_name, content, folder_id, history) => {
        // Creates new object as Post request body
        const newNote = {
            note_name,
            content,
            folder_id
        };

        // Add note to API
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
        })
        .then(res => res.ok ? res.json() : Promise.reject('Cannot make new note'))
        // Go back to homepage when posted successfully
        .then(newNote => {
            // add note to state
            this.setState({
                notes: [...this.state.notes, newNote]
            });
            history.push('/');})
        .catch(error => this.setState({error}));

    };

    removeNote = (noteId, history) => {
        // Delete note
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.ok ? Promise.resolve('Deleted note successfully') : Promise.reject('Cannot delete note'))
        .then(data => {
            // Updates state
            const newNotesList = this.state.notes.filter(note => note.id !== noteId);
            this.setState({
                notes: newNotesList
            });
            history.push('/');
        })
        .catch(error => this.setState({error}));
    };

    

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/folders`),
            fetch(`${config.API_ENDPOINT}/notes`)
        ])
            .then(([fRes, nRes]) => {
                if (!fRes.ok)
                    return fRes.json().then(e => Promise.reject(e));
                if (!nRes.ok)
                    return nRes.json().then(e => Promise.reject(e));
                return Promise.all([fRes.json(), nRes.json()]);
            })
            .then(([folders, notes]) => {
                this.setState({notes, folders});
            })
            .catch(error => this.setState({error}));

  }


    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folder_id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folder_id);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                <Switch>
                {['/', '/folder/:folder_id'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folder_id} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folder_id
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                    removeNote={this.removeNote}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain 
                            {...routeProps} 
                            note={note} 
                            removeNote={this.removeNote}
                            />;
                    }}
                />
                {/**Add Folder route*/}
                <Route path="/add-folder" render={ ({history}) => 
                    <AddFolder history={history}
                    addFolder={this.addFolder} />} />

                {/**Add Note route*/}
                <Route path="/add-note" render={({history}) => 
                    <AddNote addNote={this.addNote} folders={folders} history={history}/>}
                />

                <Route component={Error404} />
                </Switch>
            </>
        );
    }

    render() {
        return (
            <div className="App">
                <Error>
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </Error>
            </div>
        );
    }
}

export default App;
