import Application from './framework/Application.js'
import Router from './framework/Router.js'



const PORT = process.env.PORT || 5000



const router = new Router()
const application = new Application()
router.get('/users', (req, res) => {
    res.end(`You requested users}`)
})
router.get('/posts', (req, res) => {
    res.end(`You requested posts`)
})
application.addRouter(router)
application.listen(PORT, console.log('lister server'))


