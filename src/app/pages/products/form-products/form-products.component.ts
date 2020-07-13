import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit {
  @Input() prodForm;
  @Input() subcategoryData
  @Input() uploader

  @Output() submitForm = new EventEmitter<boolean>()

  constructor() { }

  formSubmit(){
    this.submitForm.emit(true)
  }

  ngOnInit(): void {
  }

}
