import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../../common/product-category';
import { ProductService } from '../../services/product.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit{

    productCategories: ProductCategory[] = [];

    constructor(private productService: ProductService){

    }

    ngOnInit(){
      this.listProductCategories();
    }

    listProductCategories() {
      this.productService.getProductCategories().subscribe((response:any)=>{
          this.productCategories = response;
      });
    }
}
