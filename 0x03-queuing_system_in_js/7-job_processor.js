const kue = require('kue');
const queue = kue.createQueue();
const blacklistedNumbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100);
  
  if (blacklistedNumbers.includes(phoneNumber)) {
    job.failed(new Error(`Phone number ${phoneNumber} is blacklisted`));
  } else {
    job.progress(50, 100);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  }
  
  done();
}

queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});

// Start the Kue job processor
const PORT = 6379; // Redis server port
const HOST = '127.0.0.1'; // Redis server host
queue
  .on('job enqueue', function (id, type) {
    console.log(`Notification job #${id} 0% complete`);
  })
  .on('job complete', function (id) {
    console.log(`Notification job #${id} completed`);
  })
  .on('job failed', function (id, err) {
    console.log(`Notification job #${id} failed: ${err.message}`);
  });

queue.watchStuckJobs();

queue.on('error', function (err) {
  console.log('Kue error:', err);
});

queue.on('ready', function () {
  console.log('Kue is ready!');
});
