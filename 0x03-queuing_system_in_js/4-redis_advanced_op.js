import redis from 'redis';

const client = redis.createClient();

client.on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err.message}`);
});

const hashObj = {
    'Portland':50,
    'Seattle':80,
    'New York':20,
    'Bogota':20,
    'Cali':40,
    'Paris':2,
};

const updateHash = (hashName, field, value) => {
    client.HSET(hashName, field, value, (_, res) => {
        redis.print(res);
        console.log('hi')
    });
};

function main () {
    for (const [field, value] of Object.entries(hashObj)) {
        updateHash('HolbertonSchools', field, value);
    }

    client.HGETALL('HolbertonSchools', (_err, res) => {
        console.log(res);
    })

}

client.on('connect', () => {
    console.log('Redis client connected to the server');
    main();
});
