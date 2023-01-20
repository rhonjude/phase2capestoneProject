import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ProductviewComponent } from './productview.component';

describe('ProductviewComponent', () => {
  let component: ProductviewComponent;
  let fixture: ComponentFixture<ProductviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductviewComponent ],
      imports:[HttpClientTestingModule,ReactiveFormsModule,FormsModule,StoreModule.forRoot({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
