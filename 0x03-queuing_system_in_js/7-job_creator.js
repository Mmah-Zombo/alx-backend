import { createQueue } from 'kue';

const queue = createQueue();
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

// Function to create a new job
function createJob(jobData) {
  const job = queue.create('push_notification_code_2', jobData)
    .save(err => {
      if (!err) {
        console.log(`Notification job created: ${job.id}`);
      }
    });

  // Handle job completion
  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
  });

  // Handle job failure
  job.on('failed', err => {
    console.log(`Notification job ${job.id} failed: ${err}`);
  });

  // Handle job progress
  job.on('progress', progress => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });
}

// Loop through the array and create jobs
for (const jobData of jobs) {
  createJob(jobData);
}

// Start the Kue queue processing
queue.process('push_notification_code_2', (job, done) => {
  // Simulate job processing (you should replace this with your actual code)
  setTimeout(() => {
    // Assuming the job is complete
    job.progress(100);
    done();
  }, 2000);
});