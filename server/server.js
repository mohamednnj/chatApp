import server from './src/app.js';

server.listen(5000, '0.0.0.0',() => {
    console.log('server running at http://localhost:5000');
});


