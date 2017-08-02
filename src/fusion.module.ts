import { NgModule, NO_ERRORS_SCHEMA, ElementRef, NgModuleFactoryLoader } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalDialogService, NSModuleFactoryLoader } from "nativescript-angular";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { TNSFontIconModule, TNSFontIconService } from 'nativescript-ng2-fonticon';
import { CfIconComponent } from "./lib/components/icon/icon.component";
import { CfImageComponent } from "./lib/components/image/image.component";
import { CfButtonComponent } from "./lib/components/button/button.component";
import { CfRatingComponent } from "./lib/components/rating/rating.component";
import { TemplateService } from "./lib/services/template-service/template.service";
import { ConfigService } from "./lib/services/configuration-service/configuration.service";

@NgModule({
  declarations: [CfIconComponent, CfImageComponent, CfButtonComponent, CfRatingComponent],
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
  exports: [CfIconComponent, CfImageComponent, CfButtonComponent, CfRatingComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class FusionModule {}
