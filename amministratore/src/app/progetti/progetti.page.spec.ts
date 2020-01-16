import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgettiPage } from './progetti.page';

describe('ProgettiPage', () => {
  let component: ProgettiPage;
  let fixture: ComponentFixture<ProgettiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgettiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgettiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
