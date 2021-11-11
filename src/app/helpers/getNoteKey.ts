import {locationType} from "../store/reducers/types";

export const getNoteKey = (noteObj: locationType) => {
    return `${noteObj.location.country}:${noteObj.location.name}:${noteObj.location.region}`.toLowerCase();
}
