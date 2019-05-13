import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory, StompRService} from '@stomp/ng2-stompjs';
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
    /*{
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },*/
    StompRService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SubscriptionComponent]
})
export class AppModule { }
