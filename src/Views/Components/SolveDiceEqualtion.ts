import { evaluate } from 'mathjs/number'
import DiceType from './GetDiceType'

function Equal(points){
    var pointChar = points.split('')
    let tosolve:string = "";
    for (let i = 0; i < pointChar.length; i++)
    {
        var c = pointChar[i];
        if (c >= '0' && c <= '9') {
            if(i==0){
                tosolve+=pointChar[i]
            }
            else if (pointChar[i - 1] != 'd')
            {
                //if it's not a d4,d6,d8, or the first number of d10, d12
                if (i > 1 && pointChar[i - 2] == 'd')
                {
                    //if this is a d10/d12
                    //DISCARD THE NUMBER
                    //do nothing;
                }
                else
                {
                    //if its not any of the dice numbers
                    tosolve += pointChar[i];
                }
            }
            else if (pointChar[i - 1] == 'd')
            {
                //if it is a d4/d6/d8
                //donothing
            }
            else
            {
                //if it's a generic number
                tosolve += pointChar[i];
            }
        } 
        else
        {
            //means its a 'd','/','-','+','x','(',')'
            if (pointChar[i] == 'd')
            {
                
                //if it's a dice indication we check the next two numbers
                if (i == 0 || !(pointChar[i - 1] >= '0' && pointChar[i - 1] <= '9'))
                {
                    tosolve += "(1";
                }
                tosolve += '*';
                tosolve += Math.floor(Math.random() * DiceType(pointChar,i)) + 1;
                if (i == 0 || !(pointChar[i - 1] >= '0' && pointChar[i - 1] <= '9'))
                {
                    tosolve += ")";
                }
            }
            else
            {
                tosolve += pointChar[i];
            }

        }
        if (!(tosolve[tosolve.length - 1] >= '0' && tosolve[tosolve.length - 1] <= '9'))
        {
            //TODO:PUT Error here
        }

    }
    console.log(tosolve);
    var returnPoints=""
    try{
    returnPoints=evaluate(tosolve).toString();}
    catch{

    }

    return (returnPoints);
}
export default Equal;