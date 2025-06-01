import EventEmitter from 'events';
import http from 'http'
class Application {
    constructor() {
        this.emitter = new EventEmitter()
        this.server = this._createServer()
    }

    listen(port, cb) {
        this.server.listen(port, cb)
    }

    _createServer() {
        return http.createServer((req, res) => {
            res.writeHead(200, { "content-type": 'application/json' });
            const emitted = this.emitter.emit(this._getRouteMask(req.url, req.method), req, res)
            if (!emitted) {
                res.end()
            }
        })
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`
    }

    // '/users': {
    //     'GET': handleGet,
    //     'POST': handlePost,
    //     'DELETE': handleDelete
    // }
    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path]
            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method]
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    handler(req, res)
                })
            })
        })
    }
}
export default Application