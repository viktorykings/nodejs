class Router {
    constructor() {
        this.endpoints = {}
    }

    request(method = 'GET', path, handler) {
        if (!this.endpoints[path]) {
            this.endpoints[path] = {}
        }

        this.endpoint = this.endpoints[path]

        if (this.endpoint[method]) {
            throw new Error(`Method ${method} already exist on path ${path}`)
        }

        this.endpoint[method] = handler

    }

    get(path, handler) {
        this.request('GET', path, handler)
    }
    post(path, handler) {
        this.request('POST', path, handler)
    }
    put(path, handler) {
        this.request('PUT', path, handler)
    }
    delete(path, handler) {
        this.request('DELETE', path, handler)
    }

}
export default Router
