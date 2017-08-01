import { NgModule, NO_ERRORS_SCHEMA, ElementRef, NgModuleFactoryLoader } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { CfIconComponent } from "./lib/components/icon/icon.component";
import { FusionModule } from "./fusion.module"; 

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    FusionModule
  ],
  providers: [],
  exports: [  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
