import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ReflectiveInjector } from '@angular/core';
import { Themes } from '../../models/theme/themes';
import { NotificationModel } from '../../models/notification/notification.model';

import { DraggableService } from '../../services/draggable-service/draggable.service';

import { TemplateService } from '../../services/template-service/template.service';

@Component({
  selector: 'cf-core',
  template: `
  <Layout>
  Cedrus Fusion UI Core
  </Layout>
  `,
  styles: ['']
})
export class CfCoreComponent implements OnInit {

  // Inject service to drag and drop components
  /**@hidden */
  injector = ReflectiveInjector.resolveAndCreate([DraggableService]);
  /**@hidden */
  draggableService: DraggableService;


  /**
   * <p>It represents an instance ID. User can set it.
   * By default, it's unique number, converted to string.</p>
   */
  @Input()
  public id: string = CfCoreComponent.generateId();

  /** @hidden
   * The name of the class that represents the component's theme
   */
  @Input()
  public themeClass: string = Themes.default_theme;

  /** @hidden
   * <p>It represents a pointer to the component's instance</p>
   */
  public nativeElement: any;

  /**@hidden
   * <p>It represents component tooltip</p>
   */
  @Input()
  public tooltip: any;

  /**@hidden
   * <p>Hide or Show Component</p>
   */
  @Input()
  public display: boolean = true;

  /**@hidden
   * <p>Disable or Enable Component</p>
   */
  @Input()
  public disable: boolean = false;


  /**
   * <p>It enables component internationalization</p>
   */
  @Input()
  public enabledI18N: boolean;

  /**
   * <p>It enables component drag and drop</p>
   */
  @Input() 
  public draggable: boolean;

  /** @hidden
	 * <p>It is a dynamic class the user can pass for the internal button</p>
	 */
	@Input() 
	public cfClass: string;

  /**
   * <p>It represents core component notifications property object based on NotificationModel Class</p>
   */
  @Input()
  public notification: NotificationModel;

  /**
   * <p> It represents the user defined template passed to the component 
   */
  @Input()
  public compTemplate: any;

  // @Input() 
  // public formControlName: any;

  /**@hidden */
	activeTemplate: any;
  
  /**
   * <p>It is core component Notifications events emmiter to be used by other components</p>
   */
  @Output()
  notificationAction: EventEmitter<any> = new EventEmitter<any>();
  
  /** @hidden
   * <p> Saves the tags of the events that the component is subscribed for.</p>
   * <p> Example: weather1, weather2, clock1...</p>
   */
  subscriptionTags: string[] = [];

  /**@hidden */
  constructor(public elementRef: ElementRef, public templateService: TemplateService) {
    this.nativeElement = this.elementRef.nativeElement;
    this.draggableService = this.injector.get(DraggableService);
  }

  /**@hidden */
  ngOnInit() {
    if (this.draggable) {
      this.draggableService.makeDraggable(this.id, this.elementRef.nativeElement, true);
    }
  }

  /** @hidden
   * <p>This method passes the attribute directive that has no parameters from the parent to the repsective child element.</p>
   * <p>@param attributeName: Name of the attribute to pass</p>
   * <p>@param attributeValue: Value of the attribute to pass</p>
   * <p>@param elementName: Name of the element that needs the attribute</p>
   */
  updateAttribute(elementName: string,attributeName: string, attributeValue): boolean
  {
    var element = this.nativeElement.querySelector(elementName);
    var myAttr = this.nativeElement.getAttribute(attributeName);
    if(myAttr === null)
    {
      if(element!=null)
        element.removeAttribute(attributeName);
      return false;
    }
    else
    {
      if(element!=null)
        element.setAttribute(attributeName, attributeValue);
      this.nativeElement.removeAttribute(attributeName);
      return true;
    }
  }
  
  /**
   * @hidden
   * @param name 
   * @param templatesObject 
   * @param passedTemplate 
   */
  getMyTemplate(name: string, templatesObject) {
    let activeTemplate = templatesObject["defaultTemplate"];
    return new Promise((resolve) => {
      this.templateService.loadTemplateJson(name, templatesObject, this.compTemplate)
        .subscribe(newTemp => {
          if(newTemp!=null)
          {
            activeTemplate = newTemp;
          }
          // if(passedTemplate!=null && passedTemplate!="")
          // {
          //   if(templatesObject[passedTemplate]!=null)
          //   {
          //     activeTemplate = templatesObject[passedTemplate];
          //   }
          //   else
          //     activeTemplate = passedTemplate;
          // }
          this.activeTemplate = activeTemplate;
          resolve();
        },
        err => { 
                  console.log('error retrieving template');
                  this.activeTemplate = activeTemplate;
                  resolve();
        })
    });
  }

  /** @hidden
   * <p>Generate unique ID</p>
   */
  static generateId(): string {
      return '' + Math.floor(Math.random() * 100000);
  }

}