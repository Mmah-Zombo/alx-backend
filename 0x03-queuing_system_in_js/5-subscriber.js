import redis from 'redis';

const client = redis.createClient();

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('message', (channel, message) => {
  console.log(`Message received on channel ${channel}: ${message}`);
  
  if (message === 'KILL_SERVER') {
    client.unsubscribe('holberton school channel');
    client.quit();
  }
});
