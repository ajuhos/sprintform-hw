import { Server } from './src/server';

const server = new Server();
const PORT = +(process.env.PORT || 8080);
server.listen(PORT)
    .then(() => console.log(`Listening on port ${PORT}.`))