import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-render-content',
  templateUrl: './render-content.component.html',
  styleUrls: ['./render-content.component.css']
})
export class RenderContentComponent implements OnInit {

  loading: any = true;
  formJson: any[] = [];
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formJson = [
      {
        key: 'name',
        type: 'input',
        type_detail: 'text',
        templateOptions: {
          label: 'Name',
          defaultValue: "Onur",
          placeholder: 'Enter name',
          required: true,
        }
      },
      {
        key: 'surname',
        type: 'input',
        type_detail: 'text',
        templateOptions: {
          label: 'Surname',
          placeholder: 'Enter surname',
          required: true,
        }
      },
      {
        key: 'email',
        type: 'input',
        type_detail: 'email',
        templateOptions: {
          label: 'Email address',
          placeholder: 'Enter email',
          required: true,
        }
      },
      {
        key: 'isAdmin',
        type: 'input',
        type_detail: 'checkbox',
        templateOptions: {
          label: 'is admin?',
          required: true,
        }
      },
      {
        key: 'language',
        type: 'select',
        type_detail: 'select',
        templateOptions: {
          label: 'Language',
          required: true,
          options: [
            {
              value: 1,
              text: "tr",
            },
            {
              value: 2,
              text: "en"
            }
          ]
        }
      },
      {
        key: 'test',
        type: 'select',
        type_detail: 'select',
        templateOptions: {
          label: 'Language',
          required: true,
          options: [
            {
              value: 1,
              text: "tr",
            },
            {
              value: 2,
              text: "en"
            }
          ]
        }
      }
    ];
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }

  get fInputs() {
    return this.form.get('inputs') as FormArray;
  }

  createForm() {

    this.form = this.fb.group({
      page_id: 1,
      page_name: "Hakkımızda",
      inputs: this.fb.array([])
    });

    this.formJson.forEach(e => {

      const form = this.fb.group({
        [e.key]: e.templateOptions?.defaultValue || ""
      });
      this.fInputs.push(form);

    });

    this.loading = false;
  }

}