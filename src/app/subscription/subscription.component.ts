import {Component, OnInit} from '@angular/core';
import {IMessage} from '@stomp/stompjs';
import {Observable} from 'rxjs/Observable';
import {Message} from '@stomp/stompjs';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  destination: string;
  receivedMessages: string[] = [];

  constructor() {
  }

  init(destination: string, messageObservable: Observable<IMessage>) {
    this.destination = destination;
    messageObservable.subscribe((message: Message) => {
      this.receivedMessages.push(message.body);
    });
  }

  ngOnInit() {
  }

}
