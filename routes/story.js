const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Story = require('../models/Story');
const User = require('../models/User');
const Note = require('../models/Note');

router.post("/stories/:id/title", express.json(),  async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id });
  console.log('got ', story, ' updating to', req.body);
  story.title = req.body.title;
  await story.save();
})

router.get("/stories/:id", Utils.authenticateToken, async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id });
  res.json(story);
})

// Get all stories this user has
router.get('/users/:id/stories', /*Utils.authenticateToken,*/ async (req, res) => {
    /*
    if(req.user._id != req.params.id){
        return res.status(401).json({
          message: "Not authorised"
        })
    }
    */
    const user = await User.findOne({ _id: req.params.id });
    const stories = await Story.find({ _id: user.stories });
    res.json(stories);
})
// Get all stories this user has
router.post('/users/:id/stories', express.json(), /*Utils.authenticateToken,*/ async (req, res) => {
    /*
    if(req.user._id != req.params.id){
        return res.status(401).json({
          message: "Not authorised"
        })
    }
    */
   const note = new Note({body: ""});
   await note.save();

   const story = new Story(req.body);
   story.note = note._id
   await story.save();

   const user = await User.findOne({
    _id: req.params.id
   });
   user.stories = user.stories;
   user.stories.push(story._id);
   await user.save();

   console.log('user = ', user);

   res.json([story, user]);
})

module.exports = router