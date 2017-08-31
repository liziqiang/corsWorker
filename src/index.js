/**
 * Created by lizq on 2017/8/31
 */
function CORSWorker( url ) {
    let promise = new Promise( ( resolve, reject ) => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener( 'load', () => {
            try {
                let blob   = window.URL.createObjectURL( new Blob( [ xhr.responseText ] ) );
                let worker = new Worker( blob );
                resolve( worker );
            } catch ( e ) {
                reject( e );
            }
        }, false );
        xhr.addEventListener( 'error', ( err ) => {
            reject( err );
        }, false );
        xhr.open( 'GET', url, true );
        xhr.send();
    } );
    return promise;
}

export default CORSWorker;