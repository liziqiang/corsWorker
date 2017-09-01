'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by lizq on 2017/8/31
 */
/**
 * generate worker support CORS
 * @param url, resource url
 * @param options, load source without cors by default
 * @returns {Promise}
 * @constructor
 */
function CORSWorker(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { cors: true };

    // indicates if we need to load source using CORS
    var cors = options.cors;
    // generate Blob Url
    // IE10 not supported
    function _getBlobUrl(url) {
        return window.URL.createObjectURL(new Blob([url]));
    }

    // generate worker by given url
    function _generateWorker(url, resolve, reject) {
        try {
            var blob = _getBlobUrl(url);
            var worker = new Worker(blob);
            resolve(worker);
        } catch (e) {
            reject(e);
        }
    }

    // generate xhr worker
    function _generateXhrWorker(url, resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
            _generateWorker(xhr.responseText, resolve, reject);
        }, false);
        xhr.addEventListener('error', reject, false);
        xhr.open('GET', url, true);
        xhr.send();
    }

    return new Promise(function (resolve, reject) {
        var _generator = cors ? _generateXhrWorker : _generateWorker;
        _generator(url, resolve, reject);
    });
}

exports.default = CORSWorker;