import redis from 'redis';

const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

const updateHash = (hashName, field, value) => {
    client.hSet(hashName, field, value, print);
};

const hashObj = {
    'Portland':50,
    'Seattle':80,
    'New York':20,
    'Bogota':20,
    'Cali':40,
    'Paris':2,
};

for (const [field, value] in Object.entries(hashObj)) {
    updateHash('HolbertonSchools', field, value);
}

client.hGetAll('HolbertonSchools', (err, res) => {
    console.log(res);
})
