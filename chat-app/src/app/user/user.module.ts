import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatModule } from '../chat/chat.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    ChatModule,
    SharedModule
  ],
  declarations: [LoginComponent, SignupComponent]
})
export class UserModule { }
