import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesMenuComponent } from './types-menu.component';

describe('TypesMenuComponent', () => {
  let component: TypesMenuComponent;
  let fixture: ComponentFixture<TypesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
