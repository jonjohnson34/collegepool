module.exports = {
  servers: {
    one: {
      "host": "138.68.5.242",
      "username": "root",
      // pem:
      "password": "Ricklefs34" 
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'kennycollegepool',
    path: '/home/jonrjohnson/webdevelopment/collegepool',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: "http://138.68.5.242",
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};