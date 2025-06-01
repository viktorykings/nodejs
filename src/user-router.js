import Router from '../framework/Router.js'
const router = new Router()

const users = [
    { id: 0, name: "Victoria" },
    { id: 1, name: "Oleg" },
]

router.get('/users', (req, res) => {
    res.send(users)
})

router.post('/users', (req, res) => {
    console.log(req.body)
    const user = req.body
    users.push(user)
    res.send(user)
})

router.get('/posts', (req, res) => {
    res.send(`You requested posts`)
})
export default router