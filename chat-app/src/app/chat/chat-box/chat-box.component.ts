import { Component, OnInit } from '@angular/core';
import { SocketService } from './../../socket.service';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})
export class ChatBoxComponent implements OnInit {

  public authToken: any;
  public userInfo: any;
  public recieverId: any;
  public recieverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;

  constructor(
    public AppService: AppService,
    public SocketService: SocketService,
    public router: Router
  ) { 
    this.recieverId = Cookie.get('recieverId');
    this.recieverName = Cookie.get('recieverName');

  }

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.userInfo = this.AppService.getUserInfoFromLocalStorage();
    this.checkStatus();
    this.verifyUserConfirmation();
    this.getOnlineUserList();
  }
  public checkStatus = () => {
    if(Cookie.get('authToken') === undefined || Cookie.get('authToken') === ''){
      this.router.navigate(['/']);
      return false;
    }
    else {
      return true;
    }
  }
  public verifyUserConfirmation: any = () => {
    this.SocketService.verifyUser()
      .subscribe((data) => {
        this.disconnectedSocket = false;
        this.SocketService.setUser(this.authToken);
        this.getOnlineUserList()
      })
  }
  public getOnlineUserList : any = () => {
    this.SocketService.onlineUserList()
    .subscribe((userList) => {
      this.userList = [];
      userList.forEach((x)=>{
        let temp = { 'userId' : x , 'name': userList[x], 'unread': 0,'chatting':false }
        this.userList.push(temp);
      })
      console.log(this.userList);
    })
  }

}
