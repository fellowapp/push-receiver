import { register } from '../../src';
import { argv } from 'yargs';

const senderId = argv.senderId;

if (!senderId) {
  console.error('Missing senderId');
  process.exit(170);
}

(async () => {
  try {
    await register(senderId);
    console.log('Successfully registered');
  } catch (e) {
    console.error('Error during registration');
    console.error(e);
  }
})();
