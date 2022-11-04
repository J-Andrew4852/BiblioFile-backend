const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Story = require('../models/Story');
const Character = require('../models/Character');
const userModel = require('../models/User');
const User = require('../models/User');
const Note = require('../models/Note')

var LNameStr = ["MacKenzie", "Andrew", "Crook", "Wang", "Zhang", "Zhao", "Mohammad", "Hernandez", "Rodriguez", "Hassain", "Smith", 
  "Williams", "Hollingworth", "Sharma", "Gomez", "Matthews", "Lee", "Miller", "Wilson", "Taylor", "Anderson", 
  "Jackson", "Anwar", "Peters", "White", "Harris", "Lewis", "Hwang", "Robinson", "Young", "Green", "Johnson", 
  "Brown", "Jones", "Garcia", "Wilson", "Moore", "Jackson", "Martin", "Thompson", "Sanchez", "Clark", "Walker", 
  "Allen", "Nguyen", "Hill", "Adams", "Hall", "Roberts", "Evans"]
const FNAME_GROUP_TO_OPTIONS = {
    "Male": ["James", "Robert", "John", "Michael", "David", "William", "Richard", "Joseph", "Thomas", "Charles", "Christopher", 
      "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin", "Brian", 
      "George", "Timothy", "Ronald", "Edward", "Jason", "Jeffrey", "Ryan", "Jacob", "Gary", "Nicholas", "Eric", 
      "Jonathan", "Larry", "Justin", "Scott", "Brandon", "Ben", "Sam", "Greg", "Alexander", "Frank", "Patrick", 
      "Raymond", "Jack", "Tyler", "Aaron", "Henry"],
    "Female": ["Mary", "Kate", "Patricia", "Jenny", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", 
      "Lisa", "Nancy", "Betty", "Margaret", "Ashley", "Kimberly", "Emily", "Michelle", "Amanda", "Lucy", "Melissa", 
      "Stephanie", "Rebecca", "Laura", "Amy", "Anna", "Emma", "Nicole", "Samantha", "Christine", "Isabelle", "Olivia", 
      "Julie", "Lauren", "Victoria", "Cheryl", "Hannah", "Jacqueline", "Madison", "Abby", "Alice", "Grace", "Sophia", 
      "Amber", "Daniella", "Marie", "Charlotte", "Alexis", "Kayla"],
    "ALL": ["James", "Robert", "John", "Michael", "David", "William", "Richard", "Joseph", "Thomas", "Charles", "Christopher", 
      "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin", "Brian", 
      "George", "Timothy", "Ronald", "Edward", "Jason", "Jeffrey", "Ryan", "Jacob", "Gary", "Nicholas", "Eric", 
      "Jonathan", "Larry", "Justin", "Scott", "Brandon", "Ben", "Sam", "Greg", "Alexander", "Frank", "Patrick", 
      "Raymond", "Jack", "Tyler", "Aaron", "Henry", "Mary", "Kate", "Patricia", "Jenny", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen", 
      "Lisa", "Nancy", "Betty", "Margaret", "Ashley", "Kimberly", "Emily", "Michelle", "Amanda", "Lucy", "Melissa", 
      "Stephanie", "Rebecca", "Laura", "Amy", "Anna", "Emma", "Nicole", "Samantha", "Christine", "Isabelle", "Olivia", 
      "Julie", "Lauren", "Victoria", "Cheryl", "Hannah", "Jacqueline", "Madison", "Abby", "Alice", "Grace", "Sophia", 
      "Amber", "Daniella", "Marie", "Charlotte", "Alexis", "Kayla"]
}
const CHARACTER_GROUP_TO_OPTIONS =  {
  "Male": ["/images/person-03.png", "/images/person-05.png", "/images/person-07.png", "/images/person-08.png", "/images/person-10.png"],
  "Female": ["/images/person-01.png", "/images/person-02.png", "/images/person-04.png", "/images/person-06.png", "/images/person-09.png"],
  "ALL": ["/images/person-03.png", "/images/person-05.png", "/images/person-07.png", "/images/person-08.png", "/images/person-10.png", "/images/person-01.png", "/images/person-02.png", "/images/person-04.png", "/images/person-06.png", "/images/person-09.png"]
}
const MOTIVATOR_GROUP_TO_OPTIONS = {
    "Fear": ["Death", "Loss", "Shame", "Regret"],
    "Evil": ["Hatred", "Greed", "Revenge", "Pride", "Lust", "Jealousy"],
    "Noble": ["Love", "Loyalty", "Honour", "Obedience", "Protection", "Inequality"],
    "Normal": ["Survival", "Failure", "Peers", "Curiosity", "Guilt", "Desire", "Instability"]
}
const LOCATIONS_GROUP_TO_OPTIONS = {
    "Clouds": ["/images/background-clouds.png"],
    "Desert": ["/images/background-desert.png"],
    "Farm": ["/images/background-farm.png"],
    "Field": ["/images/background-field.png"],
    "Space": ["/images/background-space.png"],
    "Woods": ["/images/background-woods.png"],
}
// var imgStr = [' https://cdn.myanimelist.net/images/anime/1223/96541.jpg', ' https://cdn.myanimelist.net/images/anime/9/9453.jpg', 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?cs=srgb&dl=pexels-pixabay-417173.jpg&fm=jpg', 'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-691668.jpg&fm=jpg', 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2']
var ageStr = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 
    46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 
    74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, , 18, 19, 20, 21, 22, 23, 24, 25]
// var locationStr = ["Space", "Hell", "City", "Woods", "Suburbs", "Desert", "Farm", "Rainforest", "Tropical Island", "The Future"]
var jobStr = ["Dentist", "Nurse", "Pharmacist", "Doctor", "Software Developer", "Web Developer", "Occupational Therapist", 
    "Vet", "Computer Programmer", "Psychologist", "High School Teacher", "Primary School Teacher", 
    "Kindergarten Teacher", "Engineer", "Retail Manager", "Fast Food Worker", "Supermarket Worker", 
    "Retail Worker", "Lawyer", "Accountant", "Radiologist", "Radio Host", "TV Host", "Actor", "Librarian", 
    "Hairdresser", "Esthetician", "Security Guard", "Police Officer", "Social Worker", "Architect", 
    "Real Estate Agent", "Artist", "Mechanic", "Plumber", "Electrician", "Carpenter", "Builder", "Bus Driver", 
    "Chef", "Bartender", "Barista", "Receptionist", "Cleaner", "Truck Driver", "Sports Coach", "Scientist", 
    "Paramedic", "University Student", "Pilot", "Surgeon", "Politician", "Soldier", "Personal Trainer", "Singer", 
    "Journalist", "Postman", "Flight Attendant", "Magician", "Firefighter", "Secret Agent", "Florist", "Baker", 
    "Social Media Influencer", "Hacker", "Interior Designer", "Photographer", "Graphic Designer", "Detective", 
    "Archaeologist", "Butcher", "Criminal", "Circus worker", "Clairvoyant", "Comedian", "Composer", "Lifeguard", 
    "Coroner", "Dancer", "Farmer", "Fashion designer", "Film Director", "Homemaker", "Unemployed", 
    "Hypnotherapist", "Illustrator", "Inventor", "Judge", "Meteorologist", "Midwife", "Miner", "Model", 
    "Mortician", "Musician", "Nun", "Pickpocket", "Pop Star", "Priest", "Racing driver", "Retired", "Sportsperson", 
    "Surgeon", "Tarot Reader", "Tattoo Artist", "Podcast Host", "Astronaut"]
var personalityStr = ["Abrasive", "Adventurous", "Affectionate", "Ambitious", "Analytical", "Antisocial", "Apathetic", "Bold", "Calm", 
    "Cautious", "Charming", "Compulsive", "Confident", "Confrontational", "Controlling", "Courageous", "Cowardly", 
    "Creative", "Cruel", "Curious", "Cynical", "Defensive", "Devious", "Disciplined", "Dishonest", "Disorganised", 
    "Dumb", "Easy Going", "Empathetic", "Enthusiastic", "Evasive", "Evil", "Extravagant", "Extroverted", "Flaky", 
    "Flamboyant", "Flirtatious", "Foolish", "Forgetful", "Friendly", "Frivolous", "Funny", "Fussy", "Generous", 
    "Gentle", "Gossipy", "Greedy", "Grumpy", "Gullible", "Happy", "Honest", "Hostile", "Humble", "Hypocritical", 
    "Idealistic", "Ignorant", "Imaginative", "Impulsive", "Indecisive", "Independent", "Innocent", "Insecure", 
    "Inspirational", "Intelligent", "Introverted", "Irresponsible", "Jealous", "Judgemental", "Kind", "Lazy", "Loyal", 
    "Mature", "Manipulative", "Materialistic", "Meticulous", "Mischievous", "Morbid", "Needy", "Nervous", "Nosy", 
    "Nurturing", "Obsessive", "Obedient", "Observant", "Optimistic", "Oversensitive", "Paranoid", "Passionate", 
    "Patient", "Patriotic", "Pensive", "Perceptive", "Perfectionist", "Persuasive", "Pessimistic", "Playful", 
    "Pretentious", "Private", "Professional", "Protective", "Rebellious", "Reckless", "Rowdy", "Quirky", "Selfish", 
    "Spoiled", "Stingy", "Stubborn", "Sentimental", "Sophisticated", "Spiritual", "Spontaneous", "Superstitious", 
    "Supportive", "Tactless", "Temperamental", "Timid", "Trusting", "Uninhibited", "Vain", "Vindictive", "Violent", 
    "Volatile", "Whimsical", "Whiny", "Wholesome", "Wise", "Witty", "Workaholic"]
var spiderChartStr = [2,4,6,8,10]
var barStr = [1,2,3,4,5]
var genderStr = ["Male", "Female","Male", "Female"]
var locationStr = ["Clouds", "Desert", "Farm", "Field", "Space", "Woods"]
var motivationStr = ["Fear", "Evil", "Noble", "Normal"]

function choose(items, n = null) {
  if (n === null) {
    return items[Math.floor(Math.random() * items.length)]
  }
  const choices = [];
  for (let i = 0; i < n;) {
    const item = choose(items);
    if (choices.indexOf(item) === -1) {
      choices.push(item);
      i++;
    }
    if (choices.length == n) {
      return choices;
    }
  }
}

FIELDS = [
  {
    name: "gender",
    options: _ => genderStr,
    effects: ["fname", "characterImage"]
  },
  {
    name: "characterImage",
    options: c => CHARACTER_GROUP_TO_OPTIONS[c.gender] ?? CHARACTER_GROUP_TO_OPTIONS["ALL"],
    effects: []
  },
  {
    name: "fname",
    options: c => FNAME_GROUP_TO_OPTIONS[c.gender] ?? FNAME_GROUP_TO_OPTIONS["ALL"],
    effects: []
  },
  {
    name: "lname",
    options: _ => LNameStr,
    effects: []
  },
  {
    name: "age",
    options: _ => ageStr,
    effects: []
  },
  {
    name: "location",
    options: _ => locationStr,
    effects: ["backgroundImage"]
  },
  {
    name: "backgroundImage",
    options: c => LOCATIONS_GROUP_TO_OPTIONS[[c.location]],
    effects: []
  },
  {
    name: "job",
    options: _ => jobStr,
    effects: []
  },
  {
    name: "personalityTraits",
    options: _ => [choose(personalityStr, 3)],
    effects: []
  },
  {
    name: "motivation",
    options: _ => motivationStr,
    effects: ["motivators", "bar1", "bar2", "bar3"]
  },
  {
    name: "motivators",
    options: c =>  [choose(MOTIVATOR_GROUP_TO_OPTIONS[[c.motivation]], 3)],
    effects: []
  },
  {
    name: "kindness",
    options: _ => spiderChartStr,
    effects: []
  },
  {
    name: "happiness",
    options: _ => spiderChartStr,
    effects: []
  },
  {
    name: "strength",
    options: _ => spiderChartStr,
    effects: []
  },
  {
    name: "wisdom",
    options: _ => spiderChartStr,
    effects: []
  },
  {
    name: "intelligence",
    options: _ => spiderChartStr,
    effects: []
  },
  {
    name: "stealth",
    options: _ => spiderChartStr,
    effects: []
  },
  {
    name: "bar1",
    options: _ => barStr,
    effects: []
  },
  {
    name: "bar2",
    options: _ => barStr,
    effects: []
  },
  {
    name: "bar3",
    options: _ => barStr,
    effects: []
  },
]
FIELDS_BY_NAME = FIELDS.reduce((map, field) => { map[field.name] = field; return map }, {});
// console.log(FIELDS_BY_NAME)
ALL_FIELD_NAMES = FIELDS.map(({ name }) => name);
// Get all characters this user has

/*
 Called like randomizeCharacter(character, ['gender', fname'])
*/
function randomiseCharacter(character, fields) {
  fields = fields.reduce((fs, f) => {
    console.log('looking up', f, FIELDS_BY_NAME[f]);
    return [...fs, f, ...FIELDS_BY_NAME[f].effects];
  }, []);
  for (const field of FIELDS) {1
    if (fields.indexOf(field.name) === -1) {
      continue;
    }
    const options = field.options(character);
    // console.log('options for', field, '=', options, character);
    character[field.name] = choose(options);
    // console.log(field, character[field])
  }
}

// 41
router.get('/stories/:id/characters', Utils.authenticateToken, async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    if (user.stories.indexOf(req.params.id) === -1) {
      res.status(401);
      res.send("Permission denied");
      return;
    }

    const story = await Story.findOne({ _id: req.params.id });
    // console.log('finding', story.characters);
    const characters = await Character.find({ _id: story.characters });
    res.json(characters);
})

router.get('/characters/:id', Utils.authenticateToken, async (req, res) => {
  // const user = await User.findOne({ _id: req.user._id });
  // if (user.stories.indexOf(req.params.id) === -1) {
  //   res.status(401);
  //   res.send("Permission denied");
  //   return;
  // }

  res.json(await Character.findOne({ _id: req.params.id }));
})
// Get all characters this user has
router.post('/stories/:id/characters', Utils.authenticateToken, async (req, res) => {
    /*
    if(req.user._id != req.params.id){
        return res.status(401).json({
          message: "Not authorised"
        })
    }
    */
    const note = new Note({body: ""});
    await note.save();

    const character = new Character(req.body);
    character.note = note._id
    randomiseCharacter(character, ALL_FIELD_NAMES);
    // console.log('made', character);
    await character.save();

 
    const story = await Story.findOne({
     _id: req.params.id
    });
    story.characters = story.characters;
    story.characters.push(character._id);
    await story.save();

    res.json(story)
})

router.post("/characters/:id/randomize", express.json(), async (req, res) => {
  const character = await Character.findOne({ _id: req.params.id });
  randomiseCharacter(character, req.body);
  character.save();
  console.log('randomized to ', character);
  return res.json(character);
})

router.post("/characters/:id/fields", express.json(), async (req, res) => {
  const character = await Character.findOne({ _id: req.params.id });
  const updates = Object.entries(req.body);
  for (const [key, value] of updates) {
    character[key] = value;
  }

  const effected = FIELDS
    .filter(f => updates.some(([name]) => name === f.name))
    .flatMap(f => f.effects);
  randomiseCharacter(character, effected);

  await character.save();
  res.json(character);
});

module.exports = router