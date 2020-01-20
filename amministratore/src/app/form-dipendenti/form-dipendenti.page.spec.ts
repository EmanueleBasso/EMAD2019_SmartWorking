import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormDipendentiPage } from './form-dipendenti.page';

describe('FormDipendentiPage', () => {
  let component: FormDipendentiPage;
  let fixture: ComponentFixture<FormDipendentiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDipendentiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormDipendentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
