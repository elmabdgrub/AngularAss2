import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';


@Component({
  standalone: true,
  imports: [CommonModule],

  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        console.log('Fetched users:', this.users);
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
}