import { Class } from "../Data/Class";

function GetAbilityMod(classes:Class[]){
    var total=0;
    classes.forEach(c => {
        total+=c.classLevel
    });
    return total;
}
export default GetAbilityMod;