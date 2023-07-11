import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userEmail: string = '';
  constructor() {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.userEmail = parsedUserData.email;
    }
  }
  logOut() {
    localStorage.removeItem('userData');
  }
}
