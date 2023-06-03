import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../pages/chat/chat.component';
import { ChatRoutingModule } from '../chat.routing';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ModuleChatModule { }
