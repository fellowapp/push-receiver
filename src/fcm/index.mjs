import crypto from 'crypto';
import fetch from 'node-fetch';
import { escape } from '../utils/base64';

const FCM_SUBSCRIBE = 'https://fcm.googleapis.com/fcm/connect/subscribe';
const FCM_ENDPOINT = 'https://fcm.googleapis.com/fcm/send';

export default async function registerFCM({ senderId, token }) {
  const keys = await createKeys();
  const responseJSON = await fetch(FCM_SUBSCRIBE, {
    method : 'POST',
    body   : new URLSearchParams({
      authorized_entity : senderId,
      endpoint          : `${FCM_ENDPOINT}/${token}`,
      encryption_key    : keys.publicKey
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_'),
      encryption_auth : keys.authSecret
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_'),
    }),
  }).then((response) => response.json());
  return {
    keys,
    fcm : responseJSON,
  };
}

function createKeys() {
  return new Promise((resolve, reject) => {
    const dh = crypto.createECDH('prime256v1');
    dh.generateKeys();
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        return reject(err);
      }
      return resolve({
        privateKey : escape(dh.getPrivateKey('base64')),
        publicKey  : escape(dh.getPublicKey('base64')),
        authSecret : escape(buf.toString('base64')),
      });
    });
  });
}
