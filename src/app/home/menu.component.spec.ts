import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from '../login/auth.service';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports:[FormsModule,ReactiveFormsModule,RouterModule,RouterTestingModule,StoreModule.forRoot({}),HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('testing home navbar',()=>{
    const el = fixture.debugElement.query(By.css('.nav-link'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('#home')).toBeTrue;
  });
   it('testing veges navbar',()=>{
    const el = fixture.debugElement.query(By.css('.nav-link'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('#prods')).toBeTrue;
  });
  it('testing aboutus navbar',()=>{
    const el = fixture.debugElement.query(By.css('.nav-link'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('#aboutus')).toBeTrue;
  });
  it('testing contactus navbar',()=>{
    const el = fixture.debugElement.query(By.css('.nav-link'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('#contactus')).toBeTrue;
  });
 
  it('should test username in navbar',()=>{
    component.uname='rhon';
    fixture.detectChanges();
   const ele=fixture.debugElement.nativeElement.querySelector('#userdetail');
   expect(ele.innerHTML).toBe('Hi rhon');
    // const element=el.nativeElement.getAttribute('#userdetail');

  });
});
