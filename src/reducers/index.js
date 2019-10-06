//import { combineReducers } from 'redux';
import { RECEIVE_DATA, 
    DATA_ERROR, 
    HIGHLIGHTS, 
    TOGGLE_GROUP,
    EXPAND_ALL, 
    COMPRESS_ALL
    } from '../actions/';


const defaultStore = {
    'resumeData': {
        'job': [],
        'education': [],
        'volunteer': [],
        'skill': [],
        'language': []
    },
    'groupFlag': false,
    'highlightTracker': {}
};
export default function getRData(store, action) {
    //console.log('reducer action=',action);
    //console.log('reducer action type =', action);
    //console.log('reducer store =', store);

    switch (action.type) {
    
    case RECEIVE_DATA:
        //console.log('reducer receive store', store)
        let data = Object.assign({}, store, {resumeData: action.data});
        data.groupFlag = false;
        return data;

    case DATA_ERROR: 
        return Object.assign({},{resumeData: 'error'});

    case HIGHLIGHTS:
        //console.log('reducer highlights store', store);
        let newTracker = Object.assign({}, store.highlightTracker);
        if (newTracker[action.title] == true) {
            newTracker[action.title] = false;
        }
        else {
            newTracker[action.title] = true;
        }
        
        return Object.assign({}, store, {highlightTracker: newTracker});
        
    
    case TOGGLE_GROUP: 
        if (store.groupFlag == true) {
            return Object.assign({}, store, {groupFlag: false});   
        }
        else {
            return Object.assign({}, store, {groupFlag: true});   
        }
    

    case EXPAND_ALL:
        //console.log('reducer expandable', action.expandList) 
        return Object.assign({}, store, {highlightTracker: action.expandList});   

    case COMPRESS_ALL: 
        return Object.assign({}, store, {highlightTracker: []});   
        
    }



    return defaultStore;

}