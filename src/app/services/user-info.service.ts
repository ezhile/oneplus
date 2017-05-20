import { Injectable } from '@angular/core';

@Injectable()
export class UserInfoService {

	public userInfo:any;
	constructor() {		
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));       
	}
	
	set(item: any) {
		sessionStorage.setItem('userInfo', JSON.stringify(item));
		this.userInfo = JSON.parse(sessionStorage.getItem('userInfo')); 
	}

	get(item:any){
		let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
		return userInfo[item];
	}
}
