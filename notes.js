const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {

    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)

    if(duplicateNotes.length === 0) {
        notes.push({
            'title':title,
            'body':body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Saved notes successfully !!'))
    } else {
        console.log(chalk.red.inverse('Title note already present'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const remainingNotes = notes.filter((note) => note.title !== title)
    if(remainingNotes.length === notes.length) {
        console.log(chalk.red.inverse('No note found'))
    } else {
        saveNotes(remainingNotes)
        console.log(chalk.green.inverse('Removed note'))
    }

}

const listnotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue('Your notes'))
    notes.forEach(element => {
        console.log(chalk.green.inverse(element.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()

    const noteToRead = notes.find((node) => node.title === title)
    if(noteToRead) {
        console.log(chalk.inverse(noteToRead.title))
        console.log(chalk.bold(noteToRead.body))
    } else {
        console.log(chalk.red.inverse('Nio note found'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataString = dataBuffer.toString()
        return JSON.parse(dataString)
    } catch (error) {
        return []
    }
}

const saveNotes = (notes) => {
    const notesString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesString)
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listnotes : listnotes,
    readNote : readNote
}