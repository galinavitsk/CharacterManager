function GetAbilityMod(ability:number){
    if(ability>=20){
        return 5;
    }
    if(ability==18 || ability ==19){
        return 4;
    }
    if(ability==16 || ability ==17){
        return 3;
    }
    if(ability==14 || ability ==15){
        return 2;
    }
    if(ability==12 || ability ==13){
        return 1;
    }
    if(ability==10 || ability ==11){
        return 0;
    }
    if(ability==8 || ability ==9){
        return -1;
    }
    if(ability==6 || ability ==7){
        return -2;
    }
    if(ability==4 || ability ==5){
        return -3;
    }
    if(ability==2 || ability ==3){
        return -4;
    }
    if(ability==0 || ability ==1){
        return -5;
    }
    return 0;
    
}
export default GetAbilityMod;