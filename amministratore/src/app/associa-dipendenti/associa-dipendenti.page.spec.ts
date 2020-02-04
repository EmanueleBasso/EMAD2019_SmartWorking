import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssociaDipendentiPage } from './associa-dipendenti.page';

describe('AssociaDipendentiPage', () => {
  let component: AssociaDipendentiPage;
  let fixture: ComponentFixture<AssociaDipendentiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociaDipendentiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssociaDipendentiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
