import { NgModule, NO_ERRORS_SCHEMA, ElementRef, NgModuleFactoryLoader } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalDialogService, NSModuleFactoryLoader } from "nativescript-angular";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { TNSFontIconModule, TNSFontIconService } from 'nativescript-ng2-fonticon';
import { AppComponent } from "./app.component";
import { CfIconComponent } from "./lib/components/icon/icon.component";
import { TemplateService } from "./lib/services/template-service/template.service";
import { ConfigService } from "./lib/services/configuration-service/configuration.service";
import { registerElement } from "nativescript-angular/element-registry";

registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);
@NgModule({
  declarations: [AppComponent, CfIconComponent],
  bootstrap: [AppComponent],
  imports: [
    CommonModule,
    NativeScriptHttpModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    TNSFontIconModule.forRoot({
        'mdi': 'material-design-icons.css'
    })
  ],
  providers: [ TNSFontIconService, TemplateService, ConfigService,
  ModalDialogService,
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }],
  exports: [  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
