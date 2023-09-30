import redis from 'redis';

// Create a Redis client
const client = redis.createClient();

// Event handler for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection errors
client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to set a new school value in Redis
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (error, reply) => {
    if (error) {
      console.error(`Error setting value for ${schoolName}: ${error}`);
    } else {
      console.log(`Value set for ${schoolName}: ${value}`);
      // Using redis.print as requested for confirmation message
      redis.print(`Value set for ${schoolName}: ${value}`);
    }
  });
}

// Function to display the value for a given school key
function displaySchoolValue(schoolName) {
  client.get(schoolName, (error, value) => {
    if (error) {
      console.error(`Error retrieving value for ${schoolName}: ${error}`);
    } else if (value === null) {
      console.log(`${schoolName} not found in Redis`);
    } else {
      console.log(`Value for ${schoolName}: ${value}`);
    }
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
