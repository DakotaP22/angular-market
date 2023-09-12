import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Component } from '@angular/core';

@Component({
  template: `
    <layout-navbar [title]="Test" [itemsInCart]="10">
      <li>Section 1</li>
      <li>Section 2</li>
      <li>Section 3</li>
    </layout-navbar>
  `,
  imports: [NavbarComponent],
  standalone: true,
})
class TestHostComponent {}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let testHost: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    testHostFixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    testHost = testHostFixture.componentInstance;
    fixture.detectChanges();
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title passed to the "title" input', () => {
    const title = 'My Title';
    component.title = title;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector(
      '[data-testid="title"]'
    );
    expect(element.textContent).toContain(title);
  });

  it('should display the number of items passed to the "itemsInCart" input', () => {
    const itemsInCart = 10;
    component.itemsInCart = itemsInCart;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector(
      '[data-testid="cart-count"]'
    );
    const expectedText = `${itemsInCart}`;
    expect(element.textContent).toContain(expectedText);
  });

  it('should not display a item total if the "itemsInCart" input is <= 0', () => {
    // check if cart-count is null if itemsInCart is 0
    const itemsInCart = 0;
    component.itemsInCart = itemsInCart;
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector(
      '[data-testid="cart-count"]'
    );
    expect(element).toBeNull();

    // repeat test for itemsInCart < 0
    const itemsInCart2 = -1;
    component.itemsInCart = itemsInCart2;
    fixture.detectChanges();
    const element2 = fixture.nativeElement.querySelector(
      '[data-testid="cart-count"]'
    );
    expect(element2).toBeNull();
  });

  it('should display the li elements that are content projected into the componenet', () => {
    // select elements that are projected into the component
    const element = testHostFixture.nativeElement.querySelector(
      '[data-testid="nav-section"]'
    );
    expect(element.innerHTML).toBeTruthy();
  });
});
