import X2JS from 'x2js'
import { app } from 'electron';

function ImportCompendium(xml){
var x2js = new X2JS();
var document = x2js.xml2js(xml);

var Datastore = require('nedb')
, db = new Datastore({ filename: 'Compendium.db' });
//console.log(document);
db.loadDatabase();
db.remove({}, { multi: true }, function (err, numRemoved) {
});
db.insert(document);
db.find({}, function (err, docs)
{ console.log(docs[0].compendium.item.filter(item=>{return item.ac>=0 }) ) });
}
export default ImportCompendium;
