import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers:[ProductService]
})
export class ProductListComponent implements OnInit {

  products:Product[]

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.listProduct()
  }

  listProduct(){
    try {
      this.productService.getProducts().subscribe(
        res=>this.products=res,
        err=>console.log(err)
        )
      
    } catch (error) {
      console.log(error)
    }
  }

  deleteProduct(id){

    this.productService.deleteProduct(id).subscribe(
      res=>this.listProduct(),
      error=>console.log(error)
    )
  }

  

}
