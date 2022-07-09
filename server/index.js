const fastify = require('fastify')({ logger: false })
const cluster = require('cluster')
const os = require('os')

const delay = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
const delaySync = (timeout) => {
  let start = performance.now();
  while(performance.now() - start < timeout) {}
};

const nCPUs = os.cpus().length;
console.log('========== nCPUs =============', nCPUs);

// check if the process is the master process
if (cluster.isMaster) {
    // get the number of available cpu cores 
    // fork worker processes for each available CPU core
    for(let i = 0; i< 10; i++){
      const env = {};
      env.WORKER_ID = i;
      cluster.fork(env);
    }
}else{
  fastify.route({
    method: ['GET', 'OPTIONS'],
    url: '/',
    schema: {
      // request needs to have a querystring with a `name` parameter
      querystring: {
        name: { type: 'string' }
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            duration: { type: 'string' },
          }
        }
      }
    },
    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
      const startTime = performance.now();
      console.log(`[${process.env['WORKER_ID']}]. receive request`, startTime);
      // E.g. check authentication
      reply.header("Access-Control-Allow-Origin", "*");
      reply.header("Access-Control-Allow-Headers", "*");
      reply.header("Access-Control-Allow-Methods", "*");
      reply.header("Cache-Control", "no-cache");
      request._start = startTime;
    },
    handler: async (request, reply) => {
      delaySync(1000);
      request._end = performance.now();
      console.log(`[${process.env['WORKER_ID']}]. response`, performance.now());
      return {
        id: process.env['WORKER_ID'],
        duration: String(request._end - request._start)
      };
    }
  })

  const start = async () => {
    try {
      await fastify.listen(3002)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()
}


// curl http://127.0.0.1:3002 & curl http://127.0.0.1:3002 & curl http://127.0.0.1:3002 & curl http://127.0.0.1:3002 & curl http://127.0.0.1:3002 & curl http://127.0.0.1:3002 & curl http://127.0.0.1:3002 & curl http://127.0.0.1:3002 & curl http://127.0.0.1:3002 & curl http://127.0.0.1:3002 & curl http://127.0.0.1:3002 & curl http://127.0.0.1:3002 & curl http://127.0.0.1:3002
