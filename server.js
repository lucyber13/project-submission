const Hapi = require('@hapi/hapi');
//const { response } = require('@hapi/hapi/lib/validation');
const routes = require('./routes');

const init = async (_req, _h) => {
 //   response.setHeader = {'Conten-Type':'application/json',}
    const server = Hapi.Server ({
        
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);
    await server.start();
    console.log(`Server server sedang running di http:/${server.info.uri}`);

}

init();