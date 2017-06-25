import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.css']
})
export class ProfilePage implements OnInit {
    
    constructor(private userInfoService: UserInfoService, private router: Router) {
        
    }
    ngOnInit() {
        console.log(this.userInfoService.userInfo)
    }	
    logOut(){
        let data={}; 
        this.userInfoService.set(data); 
        this.router.navigate(['/home']);
    }
}
