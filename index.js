import Application from './framework/Application.js'
import router from './src/user-router.js'
import parseJson from './framework/parseJson.js'

const PORT = process.env.PORT || 5000




const application = new Application()
application.use(parseJson)

application.addRouter(router)
application.listen(PORT, console.log('lister server'))


