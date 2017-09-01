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
function CORSWorker( url, options = { cors : true } ) {
    // indicates if we need to load source using CORS
    let cors = options.cors;
    // generate Blob Url
    // IE10 not supported
    function _getBlobUrl( url ) {
        return window.URL.createObjectURL( new Blob( [ url ] ) );
    }

    // generate worker by given url
    function _generateWorker( url, resolve, reject ) {
        try {
            let blob   = _getBlobUrl( url );
            let worker = new Worker( blob );
            resolve( worker );
        } catch ( e ) {
            reject( e );
        }
    }

    // generate xhr worker
    function _generateXhrWorker( url, resolve, reject ) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener( 'load', () => {
            _generateWorker( xhr.responseText, resolve, reject );
        }, false );
        xhr.addEventListener( 'error', reject, false );
        xhr.open( 'GET', url, true );
        xhr.send();
    }

    return new Promise( ( resolve, reject ) => {
        let _generator = cors ? _generateXhrWorker : _generateWorker;
        _generator( url, resolve, reject );
    } );
}

export default CORSWorker;