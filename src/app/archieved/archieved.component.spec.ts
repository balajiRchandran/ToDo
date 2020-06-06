import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchievedComponent } from './archieved.component';

describe('ArchievedComponent', () => {
  let component: ArchievedComponent;
  let fixture: ComponentFixture<ArchievedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchievedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
