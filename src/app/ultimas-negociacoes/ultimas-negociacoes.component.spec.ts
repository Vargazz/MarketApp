import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasNegociacoesComponent } from './ultimas-negociacoes.component';

describe('UltimasNegociacoesComponent', () => {
  let component: UltimasNegociacoesComponent;
  let fixture: ComponentFixture<UltimasNegociacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UltimasNegociacoesComponent]
    });
    fixture = TestBed.createComponent(UltimasNegociacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
