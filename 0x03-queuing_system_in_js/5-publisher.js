import redis from 'redis';
const client = redis.createClient(); // Create a Redis client

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

function publishMessage(message, time) {
  setTimeout(() => {
    console.log(`About to send MESSAGE: ${message}`);
    client.publish('holberton school channel', message);
  }, time);
}

// Publish messages after specified time intervals
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
