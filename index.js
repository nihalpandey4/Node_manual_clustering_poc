//limiting no of threads used by each child to only 1, default threads per node instance is 4
process.env.UV_THREADPOOL_SIZE=1;

const cluster = require('cluster')

if (cluster.isMaster) {
  //1st instance of the node always goes as master
  console.log("Master ="+cluster.isMaster);
  //cluster.fork() creates worker instances
  cluster.fork()
  cluster.fork()
  //instances must be equal to no of logical cores for light weight tasks and to physical cores for heavy logic tasks for optimum performance
  // cluster.fork()
  // cluster.fork()
} else {
  //instances created after forking from the master
 
  const express = require('express')
  const app = express()
  const crypto = require("crypto")

  app.get('/fast', (req, res) => {
    res.send('This is fast!')
  })

  app.get('/', (req, res) => {
    //simulate any task that some time
    crypto.pbkdf2("a","b",10000,512,"sha512",()=>{
      res.send('Hello world')
    })
  })

  app.listen(3000, () => console.log('Server started at port 3000'))
}
//performance evaluation for differenct cases done by Apache Benchmarking tool