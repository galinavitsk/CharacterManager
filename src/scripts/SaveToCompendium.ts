function SaveToCompendium(document,callback) {
	var Datastore = require("nedb"),
		db = new Datastore({ filename: "Compendium.db" });
    db.loadDatabase();
    db.remove({id:document.id}, { multi: true }, function (err, numRemoved) {
    });
    db.insert(document, function (err, numAdded) {
        console.log("INSERT");
    callback();
    });

}
export default SaveToCompendium;
