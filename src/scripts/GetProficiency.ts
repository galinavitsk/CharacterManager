function GetProficiency(level:number,race,classes,background,traits){
    var values={'currentProf':0,ProfAdded:false}
    if(level>=0 &&level<=4){
    values.currentProf=2;
    }
    if(level>=5 &&level<=8){
        values.currentProf=3;
    }
    if(level>=9 &&level<=12){
        values.currentProf=4;
    }
    if(level>=13 &&level<=16){
        values.currentProf=5;
    }
    if(level>=17){
        values.currentProf=6;
    }
if(race!=null){
    if (race.traits!=null){
        race.traits.map((trait)=>{
            values=GetModifiers(trait,values)
        })
    }
}
if(classes!=null){
    if (classes.traits!=null){
        classes.traits.map((trait)=>{
            values=GetModifiers(trait,values)
        })
    }
    if(classes.subclass!=null){
        if(classes.subclass.traits!=null){
            classes.subclass.traits.map((trait)=>{
                values=GetModifiers(trait,values)
            })
        }
    }
}
if(background!=null){
    if (background.traits!=null){
        background.traits.map((trait)=>{
            values=GetModifiers(trait,values)
        })
    }
}

    if (traits!=null){
        traits.map((trait)=>{
            values=GetModifiers(trait,values)
        })
    }
    return values.currentProf;
}

function GetModifiers(trait,values){
    if (trait.modifiers != null) {
        trait.modifiers.forEach((modifier) => {
            if (modifier.category == "Bonus") {
                if (modifier.type == "Proficiency Bonus") {
                    if (modifier.value == "+Proficiency Bonus") {
                        if (values.ProfAdded == false) {
                            values.currentProf+=values.currentProf;
                            values.ProfAdded = true;
                        }
                    } else if (modifier.value.includes("+")) {
                        values.currentProf += parseInt(
                            modifier.value.toString().substr(1)
                        );
                    } else if (modifier.value.includes("-")) {
                        values.currentProf -= parseInt(
                            modifier.value.toString().substr(1)
                        );
                    }
                }
            }
        });
    }
    return values;
}
export default GetProficiency;