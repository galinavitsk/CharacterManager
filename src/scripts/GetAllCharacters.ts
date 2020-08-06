import { Character } from "../Data/Character";

function GetAllCharacters(callback) {
	var returnCharacters: Character[] = [];
var Datastore = require("nedb"),

		characters = new Datastore({ filename: "Characters.db" });
	characters.loadDatabase();
	characters.find({}, function (err, docs) {
		docs.map(c=>{
			returnCharacters.push(c);
			
		callback(returnCharacters);
        })
    })
}
export default GetAllCharacters;
