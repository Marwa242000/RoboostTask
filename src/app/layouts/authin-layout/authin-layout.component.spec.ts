import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthinLayoutComponent } from './authin-layout.component';

describe('AuthinLayoutComponent', () => {
  let component: AuthinLayoutComponent;
  let fixture: ComponentFixture<AuthinLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthinLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthinLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
