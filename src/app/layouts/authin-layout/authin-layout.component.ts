import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarAuthComponent } from '../../components/navbar-auth/navbar-auth.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-authin-layout',
  standalone: true,
  imports: [CommonModule, NavbarAuthComponent, RouterOutlet, FooterComponent],
  templateUrl: './authin-layout.component.html',
  styleUrl: './authin-layout.component.css',
})
export class AuthinLayoutComponent {}
