import * as types from './types';
import { iDependencies } from 'mathjs';

export const UpdateCurrentHealth = (ch:number) => ({
  type: types.UPDATE_CURRENT_HEALTH,
  payload: ch,
})
export const UpdateTempHealth = (temp:number) => ({
    type: types.UPDATE_TEMP_HEALTH,
    payload: temp,
  })
  export const UpdateCurrentHitDice = (iD:number,newHD:number) => ({
    type: types.UPDATE_CLASS_CURRENT_HIT_DICE,
    iD:iD,
    payload: newHD,
  })