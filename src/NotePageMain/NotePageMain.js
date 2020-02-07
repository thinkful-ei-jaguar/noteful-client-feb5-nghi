import React from 'react'
import PropTypes from 'prop-types'
import Note from '../Note/Note'
import './NotePageMain.css'

export default function NotePageMain(props) {
  return (
    <section className='NotePageMain'>
      <Note
        id={props.note.id}
        name={props.note.note_name}
        modified={props.note.modified}
        removeNote={props.removeNote}
        history={props.history} 
      />
      <div className='NotePageMain__content'>
        {props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}

NotePageMain.propTypes = {
  note: PropTypes.object
};