import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DipendentiPage } from './dipendenti.page';

describe('DipendentiPage', () => {
  let component: DipendentiPage;
  let fixture: ComponentFixture<DipendentiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DipendentiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DipendentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
