const http = require('http');
const app = require('./app');

const normalizePort = valeur => {
    const port = parseInt(valeur, 10);
    if(isNaN(port)){
        return valeur;
    }

    if (port >= 0){
        return port;
    }
    return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const handleErreur = error => {
    if(error.syscall !== 'listen'){
        throw error;
    }
    const address = server.address();
    const bind = typeof(address) === 'string' ? 'pipe ' + address : 'port ' + port;
    switch(error){
        case 'EADDRINUSE':
            console.log(bind + " is already in use!");
            process.exit(1);
            break;
        case 'EACCES':
            console.log(bind + ' requires elevated privileges!');
            process.exit(1);
            break;
    }
    
}

const server = http.createServer(app);

server.on('error', handleErreur);
server.on('listening', ()=> {
    const address = server.address();
    const bind = typeof(address) === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
})

server.listen(port);