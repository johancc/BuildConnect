// A team works together one any one project.
// Server configuration below
require("dotenv").config();

// connect to mongodb
const mongoose = require("mongoose");
const mongoConnectionURL = process.env.MONGO_URI;
const databaseName = "ignite";
mongoose
    .connect(mongoConnectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: databaseName,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

const Team = require("../server/models/team.js");
const Project = require("../server/models/project.js");
/**
 * Adds a team to the database. The team schema can be found in server/models/team.js.
 * The schema is as follows:
 * {
 *      teamName: String // Some team name.
 *      members: Array // An array with the names of the people in the team.
 *      updates: Array // A list of project updates.
 * }
 * Update entries should include title, date, and description.
 * @param {Object} team 
 */
const addTeam = (team) => {
    const newEntry = Team(team);
    return newEntry.save().then(() =>console.log("Added team")).catch(() =>console.log("Couldn't add it."));
};

/**
 * 
 * @param {*} teamID Database ID of the team. 
 * @param {*} update the update of the team, should have the following format:
 * {
 *      title: String // Title this update.
 *      date: Date // If no date is given, will default to now.
 *      description: String // A description of the update ( the actual update body).
 * }
 */
const postTeamUpdate = (teamID, update) => {
    Team.findOne(teamID).then((team) => {
        if (team == null || team == undefined) {
            console.log("No teams found.");
            return;
        } 
        if (update.date === undefined) {
            console.log("No date given, defaulting to the current time.");
            update.date = Date.now()
        }
        team.updates.push(update);
        team.save().then(() => console.log("Posted update.")).catch((err) => console.log(err));
    })
}

const listTeams = () => {
    Team.find({}).then((teams) => console.log(teams));
}
const listProjects = ()=> {
    Project.find({}).then((projects)=>console.log(projects));
    
}

// End of helper methods

// Describe what you want to do
const add_new_team = false; 

if (add_new_team) {
    // How to add a team:
    // 1) Create a new with the information needed:
    let newTeam = {
        teamName: "BuildConnectTestTeam",
        members: ["Bit Bitdiddle", "Alyssa P. Hacker"], // The names of the people in the team.
        updates: [], // Leave empty for now.
    }
    // 2) All teams have projects, thus use listProjects() to find the project they own.
    //    Copy the _id field of the project they own.
    listProjects();

    // 3) Add the _id field to the team.
    const _id = "5ee8445cb03ffd34389dc95c";
    newTeam.project = _id;

    // 4) Add the team to the database
    let team = addTeam(newTeam);

    // 5) If there are some updates for the team, add them:
    let update = {
        title: "Some update",
        date: Date.now(), // Or include a specific date.
        description: "Describe the update. Show what the team has done so far.",
    }
    postTeamUpdate(team._id, update);
} else {
    // Ad-hoc code goes here.
    listTeams()
}
