import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: any;
    Echo: Echo<any>;
  }
}

window.Pusher = Pusher;

const echo: Echo<'reverb'> = new Echo({
  broadcaster: 'reverb',
  key: 'kmlebj92rtqsqqd62en4',
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  enabledTransports: ['ws'],
  authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  },
});

export default echo;
