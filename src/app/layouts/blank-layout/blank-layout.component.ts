import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarBlankComponent } from '../../components/navbar-blank/navbar-blank.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule, NavbarBlankComponent, RouterOutlet, FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css',
})
export class BlankLayoutComponent {}
