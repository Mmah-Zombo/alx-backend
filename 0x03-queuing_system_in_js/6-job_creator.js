import { createQueue } from 'kue';

const queue = createQueue({ name: 'push_notification_code' });
const Jdata = {
    phoneNumber: '+23299755800',
    message: 'Hi Zombo!',
};

const phone = queue.create('push_notification_code', Jdata).save(
    (err) => {
        if (!err) {
            console.log('Notification job created:', phone.id);
        }
    }
);

phone.on('complete', () => {
    console.log('Notification job completed');
});

phone.on('failed', () => {
    console.log('Notification job failed');
})