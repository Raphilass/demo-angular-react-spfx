import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'AngularSampleWebPartStrings';

import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls'

import 'my-angular-spfxproject/dist/MyAngularSPFXProject/bundle.js';

export interface IAngularSampleWebPartProps {
  ListName: string;
  NumberOfRecords: number;
  ReturnWhoseRecords: number;
  UsersDepartment: string;
}

export default class AngularSampleWebPart extends BaseClientSideWebPart<IAngularSampleWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
    <app-angular-sample-web-part 
      list-name="${ this.properties.ListName}"
      number-of-records="${ this.properties.NumberOfRecords}"
      return-whose-records="${ this.properties.ReturnWhoseRecords}"
      users-department="${ this.properties.UsersDepartment}"
    >
    </app-angular-sample-web-part>`;
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
                PropertyFieldListPicker('ListName', {
                  label: strings.ListNameFieldLabel,
                  selectedList: this.properties.ListName, // Actually ID - GUID
                  includeHidden:false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  baseTemplate: 106
                }),
                PropertyPaneChoiceGroup('ReturnWhoseRecords', {
                  label: strings.ReturnWhoseRecordsFieldLabel,
                  options: [
                    {
                      text: "My Department",
                      key: "1"
                    }, {
                      text: "My Staff",
                      key: "2"
                    }, {
                      text: "Everyone",
                      key: "3"
                    }
                  ]
                }),
                PropertyPaneSlider('NumberOfRecords', {
                  label: strings.NumberOfRecordsFieldLabel,
                  min: 1,
                  max: 15
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
