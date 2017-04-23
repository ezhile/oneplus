import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.css']
})
export class ProfilePage implements OnInit {
    
    constructor(private userInfoService: UserInfoService) {
        
    }
    ngOnInit() {
        console.log(this.userInfoService.userInfo)
    }	
}
