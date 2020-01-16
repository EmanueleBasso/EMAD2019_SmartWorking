import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormProgettiPage } from './form-progetti.page';

describe('FormProgettiPage', () => {
  let component: FormProgettiPage;
  let fixture: ComponentFixture<FormProgettiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProgettiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormProgettiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
