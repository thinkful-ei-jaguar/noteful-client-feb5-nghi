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
            name: folderName};

        // Add folder to API
        fetch('http://localhost:9090/folders', {
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
    }

    addNote = (name, content, folderId, history) => {
        // Creates new object as Post request body
        const newNote = {
            name,
            content,
            folderId
        }

        // Add note to API
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
        })
        .then(res => res.ok ? res.json() : Promise.reject('Cannot make new note'))
        // Go back to homepage when posted successfully
        .then(data => history.push('/'))
        .catch(error => this.setState({error}));

        // Add note to state
        this.setState({
            notes: [...this.state.notes, newNote]
        });
    }

    removeNote = (noteId) => {
        // Delete note
        fetch(`http://localhost:9090/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.ok ? res.json() : Promise.reject('Cannot delete note', noteId))
        .then(data => {
            // Updates state
            const newNotesList = this.state.notes.filter(note => note.id !== noteId);
            this.setState({
                notes: newNotesList
            });
        }
            )
        .catch(error => this.setState({error}));
    }

    componentDidMount() {
        // Get folders
        fetch('http://localhost:9090/folders')
        .then(res => res.ok ? res.json() : Promise.reject('Cannot get folders'))
        .then(folders => this.setState({folders}))
        .catch(error => this.setState({error}));

        // Get notes
        fetch('http://localhost:9090/notes')
        .then(res => res.ok ? res.json() : Promise.reject('Cannot get notes'))
        .then(notes => this.setState({notes}))
        .catch(error => this.setState({error}));
  }


    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
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
                        const folder = findFolder(folders, note.folderId);
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
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
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
                        return <NotePageMain {...routeProps} note={note} />;
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
