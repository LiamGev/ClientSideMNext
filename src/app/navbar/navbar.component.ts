// navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [NgbCollapseModule, RouterLink, CommonModule],
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;

  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {
    console.log('Navbar component initialized');
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
