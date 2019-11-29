import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalendarioDipendentiPage } from './calendario-dipendenti.page';

describe('CalendarioDipendentiPage', () => {
  let component: CalendarioDipendentiPage;
  let fixture: ComponentFixture<CalendarioDipendentiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioDipendentiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarioDipendentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
