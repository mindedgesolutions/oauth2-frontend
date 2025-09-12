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
  key: 'local-app-key',
  wsHost: '127.0.0.1',
  wsPort: 6001,
  forceTLS: false,
  enabledTransports: ['ws'],
});

export default echo;
