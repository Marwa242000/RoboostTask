import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBlankComponent } from './navbar-blank.component';

describe('NavbarBlankComponent', () => {
  let component: NavbarBlankComponent;
  let fixture: ComponentFixture<NavbarBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarBlankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
