/**
 * Created by jiangshan on 15/9/19.
 */
import 'es6-promise';
import 'whatwg-fetch';


//fetch(url).then(response =>
//    response.json().then(json => {
//        const camelizedJson = camelizeKeys(json);
//        const nextPageUrl = getNextPageUrl(response) || undefined;
//
//        return {
//            ...normalize(camelizedJson, schema),
//            nextPageUrl
//    };
//})
//);
//export function fetchURL(url, callback) {
//    return fetch(url).then(response => {
//        response.json().then(json => {
//            callback(json);
//        })
//    });
//}

let APIUtils = {
    fetchURL: function(url, callback) {
        return fetch(url).then(response => {
                response.json()
                    .then(json => {
                        callback(json)
                    }
                )
            }
        ).catch(function(ex) {
            console.log('parsing failed', ex)
        })
    }
}

module.exports = APIUtils;

