import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {InjectableRxStompConfig, StompRService} from '@stomp/ng2-stompjs';
import {SubscriptionComponent} from '../subscription/subscription.component';
import {RxStompConfig, RxStompState} from '@stomp/rx-stomp';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @ViewChild('subscriptions', {read: ViewContainerRef}) subscriptions: ViewContainerRef;

  public connectionStatus$: Observable<string>;

  message = {
    message: '',
    destination: ''
  };

  subscriptionDestination: string;

  server = {
    oauth2token: '',
    url: ''
  };

  private stompConfig: RxStompConfig;

  constructor(// private rxStompService: RxStompService,
    private stompService: StompRService,
              private resolver: ComponentFactoryResolver,
              private defaultConfig: InjectableRxStompConfig) {
    this.stompConfig = defaultConfig;
    this.connectionStatus$ = stompService.connectionState$.pipe(map((state) => {
      return RxStompState[state];
    }));
  }

  ngOnInit() {
  }

  addSubscription() {
    if (!this.stompService.connected()) {
      console.warn('Connected!');
      return;
    }
    const factory = this.resolver.resolveComponentFactory(SubscriptionComponent);
    const subscription = this.subscriptions.createComponent(factory);
    subscription.instance.init(this.subscriptionDestination, this.stompService.watch(this.subscriptionDestination));
  }

  onSendMessage() {
    if (this.message.message && this.message.destination) {
      this.stompService.publish({destination: this.message.destination, body: this.message.message});
    }
  }

  connect() {
    if (this.stompService.connected()) {
      this.stompService.deactivate();
    } else {
      this.stompConfig.brokerURL = this.server.url + '?access_token=' + this.server.oauth2token;
      this.stompService.configure(this.stompConfig);
      this.stompService.initAndConnect();
    }
  }
}
