const chalk = require('chalk')
const validator = require('validator')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const notes = require('./notes.js')


yargs(hideBin(process.argv))
    .command(
        {
            command:'add', 
            description:'Add a new note', 
            builder: (yargs) => {
                return yargs.positional('title', {
                    describe: 'Note title',
                    type: 'string'
                }).positional('body', {
                    describe: 'Note content',
                    default: '',
                    type: 'string'
                })
                .demandOption('title')
            },
            handler(argv) { 
                notes.addNote(argv.title, argv.body) 
            }
        }
    )
    .command(
        {
            command:'remove',
            description:'Remove a note',
            builder: (yargs) => {
                return yargs.positional('title', {
                    describe: 'Note title',
                    type: 'string'
                })
                .demandOption('title')
            },
            handler(argv) { 
                notes.removeNote(argv.title) 
            }
        }
    )
    .command(
        {
            command:'list', 
            description:'List all notes', 
            handler() { 
                notes.listnotes()
            }
        }
    )
    .command(
        {
            command:'read', 
            description:'Read a note', 
            builder: (yargs) => {
                return yargs.positional('title', {
                    describe: 'Note title',
                    type: 'string'
                })
                .demandOption('title')
            },
            handler(argv) { 
                notes.readNote(argv.title) 
            }
        }
    )
    .argv