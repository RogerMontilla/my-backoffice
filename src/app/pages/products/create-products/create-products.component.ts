import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

const URL = 'http://localhost:3000/products/upload-img/';
@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css'],
})
export class CreateProductsComponent implements OnInit {
  imgState = new BehaviorSubject(false);

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'photo',
    headers: [{ name: 'x-access-token', value: localStorage.getItem('token') }],
  });

  subcategoryData;
  prodForm: FormGroup;
  //Que hace esta variable???
  imagesData;
  constructor(
    private fb: FormBuilder,
    private prodCreate: ProductsService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {
    this.prodForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      sku: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      offert: ['', Validators.required],
      quantity: ['', Validators.required],
      subcategory: ['', Validators.required],
      featured: ['true', Validators.required],
      images:['']
    });
  }

  register() {

    this.uploader.uploadAll();

    this.imgState.subscribe((state)=>{
      if(state){
        this.prodForm.get('images').setValue(this.imagesData);
        this.prodCreate.createProd(this.prodForm.value).subscribe(
          (data) => {
            this.snackBar.open('Product was crated', 'Successfully', {
              duration: 2000
            })
            this.prodForm.reset();
          },
          (err) => {
            this.snackBar.open("Product wasn't created",'Try again', {
              duration: 2000
            })
            console.log(err.error.msg);
          }
        );
      }
    })
    
  }

  ngOnInit(): void {
    this.prodCreate.getSubCategories().subscribe((data) => {
      this.subcategoryData = data;
    });
    
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      let json = JSON.parse(response);
      this.imagesData = json['data'];
      //cambia el estado del observable
      this.imgState.next(true)
    };
  }

  isImgUploaded(){
    return this.imgState
  }

}
