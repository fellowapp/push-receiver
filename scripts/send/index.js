const argv = require('yargs').argv;
const fetch = require('node-fetch');

const serverKey = argv.serverKey;
const token = argv.token;

if (!serverKey) {
  console.error('Missing serverKey argument');
  return;
}

if (!token) {
  console.error('Missing token argument');
  return;
}

(async () => {
  try {
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      body: JSON.stringify({
        to: token,
        notification: {
          title: 'Hello world',
          body: 'Test',
        },
      }),
      headers: {
        Authorization: `key=${serverKey}`,
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
  } catch (e) {
    console.error(e.message);
  }
})();
