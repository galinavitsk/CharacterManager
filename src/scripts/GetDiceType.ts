
  
  
  function  DiceType(pointChar:string[], i:number)
        {
           var dicetype:string  = "";
            let diceTypeNumber:number = 0;
            if ((i + 1) == pointChar.length || !(pointChar[i+1] >= '0' && pointChar[i+1]  <= '9'))
            {
                //TODO:Code for if dice is the last character or number for the dice type was deleted
                return 0;
            }
            if ((i + 1) <= pointChar.length - 1 && (pointChar[i+1] >= '0' && pointChar[i+1]  <= '9'))
            {
                //Check first number for dice type
                dicetype+=pointChar[i + 1];
            }
            if ((i + 2)<= pointChar.length - 1 && (pointChar[i+2] >= '0' && pointChar[i+2]  <= '9'))
            {
                //check second number for dice type
                dicetype+=pointChar[i + 2];
            }
            try
            {
                diceTypeNumber=parseInt(dicetype, 10);
            }
            catch
            {
                //TODO:ENTER ERROR CODE HERE IN CASE DICE CONVERSION FAILS
                return 0;
            }
            return diceTypeNumber;
        }
        export default DiceType;