import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';

export const myRxStompConfig: InjectableRxStompConfig = {

  // todo: config
  brokerURL: 'ws://127.0.0.1:8080/call?access_token=96fab3cb-c703-40b0-90c7-d2180feb0d31',

  // Headers
  connectHeaders: {
  },

  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,

  reconnectDelay: 200,

  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};
