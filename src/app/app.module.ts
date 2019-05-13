import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {InjectableRxStompConfig, StompRService} from '@stomp/ng2-stompjs';
import { AppComponent } from './app.component';
import {myRxStompConfig} from './stomp/my-rx-stomp.config';
import { MessagesComponent } from './messages/messages.component';
import {FormsModule} from '@angular/forms';
import { SubscriptionComponent } from './subscription/subscription.component';
import {CollapseModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    SubscriptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CollapseModule
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    StompRService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SubscriptionComponent]
})
export class AppModule { }
