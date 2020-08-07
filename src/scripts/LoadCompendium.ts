import { Race } from "../Data/Race";

export function LoadRaces(callback) {
	var returnRaces: Race[] = [];
	var Datastore = require("nedb"),
		races = new Datastore({ filename: "Compendium.db" });
		races.loadDatabase();
		races.find({size:{$exists:true}}, function (err, docs) {
			console.log(docs);
		docs.map((c) => {
			
			returnRaces.push(c);
			callback(returnRaces);
		});
	});
}
