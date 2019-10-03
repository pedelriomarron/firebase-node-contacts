//Inicializor de la aplicacion
const app = require('./app')

app.listen(app.get('port'));
console.log('server works in port', app.get('port'))