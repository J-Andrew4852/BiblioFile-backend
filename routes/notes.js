const express = require('express')
const NoteModel = require('../models/Note')
const StoryModel = require('../models/Story')
const CharacterModel = require('../models/Character')
const router = express.Router()
const Utils = require('../utils')

router.get("/story/:id/note", async (req, res) => {
    const story = await StoryModel.findOne({ _id: req.params.id });
    const note = await NoteModel.findOne({ _id: story.note });
    return res.json(note);
})

router.post("/story/:id/note", async (req, res) => {
    const story = await StoryModel.findOne({ _id: req.params.id });
    const note = await NoteModel.findOne({ _id: story.note });
    note.body = req.body.note;
    await note.save();
    return res.json(note);
})

router.get("/characters/:id/note", async (req, res) => {
    // console.log(req.params)
    const characters = await CharacterModel.findOne({ _id: req.params.id });
    const note = await NoteModel.findOne({ _id: characters.note });
    return res.json(note);
})

router.post("/characters/:id/note", async (req, res) => {
    const characters = await CharacterModel.findOne({ _id: req.params.id });
    const note = await NoteModel.findOne({ _id: characters.note });
    // console.log(note, req.body)
    note.body = req.body.note;
    await note.save();
    return res.json(note);
})



// Get all stories this user has
router.get('/users/:id/notes', Utils.authenticateToken, (req, res) => {
    /*
    if(req.user._id != req.params.id){
        return res.status(401).json({
          message: "Not authorised"
        })
    }
    */
    res.json([
        {
            story: "story notes",
            character: "character notes",
            other: "other notes"
        }
    ])
})
// Get all stories this user has
router.post('/users/:id/notes', express.json(), Utils.authenticateToken, (req, res) => {
    /*
    if(req.user._id != req.params.id){
        return res.status(401).json({
          message: "Not authorised"
        })
    }
    */
    res.json(req.body)
})

module.exports = router