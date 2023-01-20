import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AddtocartComponent } from './addtocart.component';

describe('AddtocartComponent', () => {
  let component: AddtocartComponent;
  let fixture: ComponentFixture<AddtocartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtocartComponent ],
      imports:[HttpClientTestingModule,ReactiveFormsModule,FormsModule,StoreModule.forRoot({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtocartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check is cart is empty checkout button is disabled', ()=>{
    component.isCartEmpty=true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('button')).nativeElement.disabled).toBeTruthy();

  });
});
