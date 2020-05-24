import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BaseTestModule } from "app/base-test.module.spec";
import { ContentOverviewComponent } from "./content-overview.component";

describe("ContentOverviewComponent", () => {
  let component: ContentOverviewComponent;
  let fixture: ComponentFixture<ContentOverviewComponent>;

  beforeEach(async(() => {
    // tslint:disable-next-line: no-floating-promises
    TestBed.configureTestingModule({
      imports: [BaseTestModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
