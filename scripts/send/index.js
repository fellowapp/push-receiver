const argv = require('yargs').argv;
const { fetch } = require('../../src/utils/fetch');

const serverKey = argv.serverKey;
const token = argv.token;

if (!serverKey) {
  console.error('Missing serverKey argument');
  process.exit(171);
}

if (!token) {
  console.error('Missing token argument');
  process.exit(172);
}

(async () => {
  try {
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method : 'POST',
      body   : JSON.stringify({
        to           : token,
        notification : {
          title : 'Hello world',
          body  : 'Test',
        },
      }),
      headers : {
        Authorization  : `key=${serverKey}`,
        'Content-Type' : 'application/json',
      },
    });
    console.log(response);
  } catch (e) {
    console.error(e.message);
  }
})();
