import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';

export const myRxStompConfig: InjectableRxStompConfig = {

  // todo: config
  brokerURL: 'ws://127.0.0.1:8080/call',

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
