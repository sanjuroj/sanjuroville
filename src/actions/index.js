import fetch from 'isomorphic-fetch';



export const RECEIVE_DATA = 'RECEIVE_DATA';
export const DATA_ERROR = 'DATA_ERROR';
export const HIGHLIGHTS = 'HIGHLIGHTS';
export const TOGGLE_GROUP = 'TOGGLE_GROUP';
export const EXPAND_ALL = 'EXPAND_ALL';
export const COMPRESS_ALL = 'COMPRESS_ALL';



function receiveData (json) {
    return {
        type:RECEIVE_DATA,
        data: json
    };
}

function dataError (err) {
    return {
        type:DATA_ERROR,
        data: err
    };
}

export function expand_all(expandable){
    let expandList = [];
    for (let cat of expandable){
        for (let item of cat.data) {
            expandList[item.title+item.organization] = true;
        }
    }
    return {
        type: EXPAND_ALL,
        expandList
    };
}

export function compress_all(){
    return {
        type: COMPRESS_ALL
    };
}

export function toggle_grouped() {
    return{
        type: TOGGLE_GROUP
    };
    
}

export function fetchData () {
    // let apiurl = '//' + window.location.host + '/resume/api/?format=json';
    let apiurl = 'http://138.68.12.239/resume/api/?format=json';
    return dispatch => {
        fetch(apiurl)
        .then(
            response => {
                //console.log('here');
                return response.json();
            },
            reject => dispatch(dataError(reject))
        )
        .then(
            json => {
                //console.log('there',json);
                dispatch(receiveData(json));
            }
        )
    }
}