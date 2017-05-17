import { Injectable } from '@angular/core';

@Injectable()
export class UserInfoService {

	public userInfo:any;
	constructor() {		
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));       
	}
	
	setItem(item: any) {
		sessionStorage.setItem('userInfo', JSON.stringify(item));
		this.userInfo = JSON.parse(sessionStorage.getItem('userInfo')); 
	}
	

}
