import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {StompHeaders} from '@stomp/ng2-stompjs';
import {SubscriptionComponent} from '../subscription/subscription.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @ViewChild('subscriptions', {read: ViewContainerRef}) subscriptions: ViewContainerRef;

  message = {
    message: 'message',
    destination: 'destination'
  };

  subscriptionDestination: string;

  constructor(private rxStompService: RxStompService,
              private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {

    this.rxStompService.serverHeaders$.subscribe((headers: StompHeaders) => {
      console.log('connected!');
      /*this.rxStompService.watch('/user/test-destination').subscribe((message: Message) => {
        console.log('received:', message.body);
      });

      this.rxStompService.watch('/user/incoming-call').subscribe((message: Message) => {
        console.log('received incoming call message');
        console.log('message body: ', message.body);
      });

      this.rxStompService.watch('/broadcast').subscribe((message: Message) => {
        console.log('received broadcast: ', message.body);
      });

      this.rxStompService.watch('/users').subscribe((message: Message) => {
        console.log('login message: ', message.body);
      });*/
    });
  }

  addSubscription() {
    const factory = this.resolver.resolveComponentFactory(SubscriptionComponent);
    const subscription = this.subscriptions.createComponent(factory);
    subscription.instance.init(this.subscriptionDestination, this.rxStompService.watch(this.subscriptionDestination));
  }

  onSendMessage() {
    if (this.message.message && this.message.destination) {
      this.rxStompService.publish({destination: this.message.destination, body: this.message.message});
    }
  }
}
