import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryArray: any = [];
  formCategory!: string;
  formStatus: string = 'Add';
  categoryId!: string;

  constructor(private categoryService: CategoriesService) {}
  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      console.log(val);
      this.categoryArray = val;
    });
  }

  // form onsubmit
  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category,
    };

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
      // to reset the input box
      formData.reset();
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }
  }

  // edit method
  onEdit(category: any, id: any) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }
  onDelete(id: any) {
    this.categoryService.deleteData(id);
  }
}

// onSubmit(formData: any) {
//   // category Forms and value as an object
//   //category: formData.value.category,
//   // formData = ngForm the whole object reference not the value category,disable etc
//   // value = object in the console the whole thing this =>{category: 'Leyson Caliao}
//   // category = {this category =>(category): 'Leyson Caliao'}

//   let categoryData = {
//     category: formData.value.category,
//   };
//   this.categoryService.saveData(categoryData);

//   let subCategoryData = {
//     subCategory: 'subCategory1',
//   };

//   // Main categories
//   this.afs
//     .collection('categories')
//     .add(categoryData)
//     .then((docRef) => {
//       console.log(docRef);

//       // Second Path categories
//       // this.afs
//       //   .doc(`/categories/${docRef.id}`)
//       //   .collection('subcategories')
//       //   .add(subCategoryData);

//       // Second categories
//       this.afs
//         .collection('categories')
//         .doc(docRef.id)
//         .collection('subcategories')
//         .add(subCategoryData)
//         .then((docRef1) => {
//           console.log(docRef1);

//           // Third Path categories
//           // this.afs
//           //   .doc(`categories/${docRef.id}/subcategories/${docRef1.id}/`)
//           //   .collection('subsubcategories')
//           //   .add(subCategoryData);

//           // Third categories
//           this.afs
//             .collection('categories')
//             .doc(docRef.id)
//             .collection('subcategories')
//             .doc(docRef1.id)
//             .collection('subsubcategories')
//             .add(subCategoryData)
//             .then((docRef2) => {
//               console.log('Secon Level Subcategory saved successfully');
//               console.log(docRef2);
//             });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
