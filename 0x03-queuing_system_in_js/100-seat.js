const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const kue = require('kue');
const bodyParser = require('body-parser');

const app = express();
const port = 1245;

// Connect to the Redis server
const client = redis.createClient({ host: 'localhost', port: 6379 });
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Initialize the number of available seats and reservationEnabled
let availableSeats = 50;
let reservationEnabled = true;

// Create a Kue queue
const queue = kue.createQueue();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Function to reserve seats in Redis
async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

// Function to get the current available seats from Redis
async function getCurrentAvailableSeats() {
  const seats = await getAsync('available_seats');
  return seats ? parseInt(seats) : availableSeats;
}

// Route to get the number of available seats
app.get('/available_seats', (req, res) => {
  res.json({ numberOfAvailableSeats: availableSeats });
});

// Route to reserve a seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat').save(err => {
    if (!err) {
      res.json({ status: 'Reservation in process' });
    } else {
      res.json({ status: 'Reservation failed' });
    }
  });

  job.on('complete', id => {
    console.log(`Seat reservation job ${id} completed`);
  });

  job.on('failed', (id, err) => {
    console.log(`Seat reservation job ${id} failed: ${err.message}`);
  });
});

// Route to process the queue
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    const currentSeats = await getCurrentAvailableSeats();
    
    if (currentSeats === 0) {
      reservationEnabled = false;
      done(new Error('Not enough seats available'));
    } else if (currentSeats > 0) {
      await reserveSeat(currentSeats - 1);
      if (currentSeats - 1 === 0) {
        reservationEnabled = false;
      }
      done();
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
