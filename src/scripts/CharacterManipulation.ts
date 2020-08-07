import X2JS from "x2js";
import { app } from "electron";
import { Character } from "../Data/Character";
import configureStore from "../redux/configureStore";

export function GetAllCharacters(callback) {
	var returnCharacters: Character[] = [];
	var Datastore = require("nedb"),
		characters = new Datastore({ filename: "Characters.db" });
	characters.loadDatabase();
	characters.find({}, function (err, docs) {
		docs.map((c) => {
			returnCharacters.push(c);

			callback(returnCharacters);
		});
	});
}

export function SaveCharacter(character: Character) {
	var Datastore = require("nedb"),
		characters = new Datastore({ filename: "Characters.db" });
	characters.loadDatabase();
	characters.remove({}, { multi: true }, function (err, numRemoved) {});
	//characters.remove({id:character.id}, { multi: true }, function (err, numRemoved) {});
	characters.insert(character);
	characters.find({}, function (err, docs) {
		console.log(docs);
	});
}

