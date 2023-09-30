import redis from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = redis.createClient();

// Promisify the Redis client methods
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Event handler for successful connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Event handler for connection errors
client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to set a new school value in Redis
async function setNewSchool(schoolName, value) {
  try {
    await setAsync(schoolName, value);
    console.log(`Value set for ${schoolName}: ${value}`);
    // Using redis.print as requested for confirmation message
    redis.print(`Value set for ${schoolName}: ${value}`);
  } catch (error) {
    console.error(`Error setting value for ${schoolName}: ${error}`);
  }
}

// Function to display the value for a given school key using async/await
async function displaySchoolValue(schoolName) {
  try {
    const value = await getAsync(schoolName);
    if (value === null) {
      console.log(`${schoolName} not found in Redis`);
    } else {
      console.log(`Value for ${schoolName}: ${value}`);
    }
  } catch (error) {
    console.error(`Error retrieving value for ${schoolName}: ${error}`);
  }
}

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
