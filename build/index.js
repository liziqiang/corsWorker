'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by lizq on 2017/8/31
 */
function CORSWorker(url) {
    var promise = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
            try {
                var blob = window.URL.createObjectURL(new Blob([xhr.responseText]));
                var worker = new Worker(blob);
                resolve(worker);
            } catch (e) {
                reject(e);
            }
        }, false);
        xhr.addEventListener('error', function (err) {
            reject(err);
        }, false);
        xhr.open('GET', url, true);
        xhr.send();
    });
    return promise;
}

exports.default = CORSWorker;