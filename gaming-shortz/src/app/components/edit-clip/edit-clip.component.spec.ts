import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClipComponent } from './edit-clip.component';

describe('EditClipComponent', () => {
  let component: EditClipComponent;
  let fixture: ComponentFixture<EditClipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditClipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
