const app = require('./app');
const server = require('http').Server(app);
server.listen(4001,'localhost', ()=> {
    console.log('Server Started');
});