module.exports = {
  'isDev': false,
  'session': {
    'host': 'localhost',
    'port': 6379,
    'db': 1,
    'secret': 'bang!',
    'secure': false
  },
  'http': {
    'listen': 'localhost',
    'port': 3000
  },
  'client': {
    'apiUrl': 'http://localhost:3000',
    'debugMode': true
  }
}
