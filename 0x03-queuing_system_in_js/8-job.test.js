import kue from 'kue';
import { createPushNotificationsJobs } from './8-job.js';
import { expect } from 'chai';

describe('createPushNotificationsJobs', function () {
  let queue;

  beforeEach(function () {
    // Create a new Kue queue in test mode
    queue = kue.createQueue({ redis: { createClientFactory: () => kue.redis.createClient({ host: '127.0.0.1', port: 6379 }) } });
    queue.testMode.enter();
  });

  afterEach(function () {
    // Clear the queue and exit test mode after each test
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should display an error message if jobs is not an array', function () {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
  });

  it('should create two new jobs in the queue', function () {
    const list = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 5678 to verify your account'
      }
    ];

    createPushNotificationsJobs(list, queue);

    const jobs = queue.testMode.jobs;

    // Assert that two jobs were created
    expect(jobs.length).to.equal(2);

    // Assert that the job type is correct
    expect(jobs[0].type).to.equal('push_notification_code_3');
    expect(jobs[1].type).to.equal('push_notification_code_3');

    // Assert that the job data is correct
    expect(jobs[0].data).to.deep.equal(list[0]);
    expect(jobs[1].data).to.deep.equal(list[1]);
  });
});
