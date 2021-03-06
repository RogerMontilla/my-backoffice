import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  categoryData;
  categoryForm: FormGroup;
  subCategoryForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private categoryService: ProductsService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {
    this.categoryForm = this.fb.group({
      category: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', Validators.required],
    });

    this.subCategoryForm = this.fb.group({
      subname: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', Validators.required],
      parent: ['', Validators.required],
    })
  }

  createCategory() {
    console.log(this.categoryForm.value);
    //Ejemplo con error en observable
    this.categoryService.createCategory(this.categoryForm.value).subscribe(
      (data) => {
        this.snackBar.open('Category was created', 'Successfully', {
          duration: 2000
        })        
        this.categoryForm.reset()
      },
      (err) => {
        //en caso de error
        console.log(err.error.msg);
      }
    );
  }

  createSubCategory() {
    console.log(this.subCategoryForm.value);
    //Ejemplo con error en observable
    this.categoryService.createSubCategory(this.subCategoryForm.value).subscribe(
      (data) => {
        this.snackBar.open('Subategory was created', 'Successfully', {
          duration: 2000
        })
        this.subCategoryForm.reset()
      },
      (err) => {
        //en caso de error
        console.log(err.error.msg);
      }
    );
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      console.log(data)
      this.categoryData = data
    })
  }

}
