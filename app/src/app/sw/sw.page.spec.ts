import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SwPage } from './sw.page';

describe('SwPage', () => {
  let component: SwPage;
  let fixture: ComponentFixture<SwPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
