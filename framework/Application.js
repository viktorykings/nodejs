import EventEmitter from 'events';
import http from 'http'
class Application {
    constructor() {
        this.emitter = new EventEmitter()
        this.server = this._createServer()
        this.middlewares = []
    }

    listen(port, cb) {
        this.server.listen(port, cb)
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }

    _createServer() {
        return http.createServer((req, res) => {
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
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    const handler = endpoint[method]
                    this.middlewares.forEach(mw => mw(req, res))
                    handler(req, res)
                })
            })
        })
    }
}
export default Application