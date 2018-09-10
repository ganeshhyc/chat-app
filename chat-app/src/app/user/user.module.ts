import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule,Routes } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        { path:'signup', component:SignupComponent }
      ]
    )
  ],
  declarations: [LoginComponent, SignupComponent]
})
export class UserModule { }
