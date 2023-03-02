const mongoose = require('mongoose')
const { model, Schema } = mongoose

const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

//? Modifiquem schema per tenir un .id y borrar _id y __v que no necesitem
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = model('Note', noteSchema)

module.exports = Note

/*const note = new Note({
    content: 'MongoDB es increible',
    date: new Date(),
    important: true
})

note.save()
    .then(result => {
        console.log(result)
        mongoose.connection.close()
    })
    .catch(err => {
        console.error(err)
    })
*/