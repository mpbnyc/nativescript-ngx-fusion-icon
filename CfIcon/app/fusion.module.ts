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

@NgModule({
  declarations: [CfIconComponent],
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
  exports: [CfIconComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FusionModule {}
