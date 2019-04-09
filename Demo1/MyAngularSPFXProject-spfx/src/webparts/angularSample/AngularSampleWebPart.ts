import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AngularSampleWebPartStrings';

import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls'

import 'my-angular-spfxproject/dist/MyAngularSPFXProject/bundle.js';

export interface IAngularSampleWebPartProps {
  description: string;
}

export default class AngularSampleWebPart extends BaseClientSideWebPart<IAngularSampleWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <app-angular-sample-web-part description="${this.properties.description}"></app-angular-sample-web-part>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.descriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
