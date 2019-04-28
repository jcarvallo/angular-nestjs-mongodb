import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product} from './interfaces/product.interface';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private productModel:Model<Product>){}

    async getProducts():Promise<Product[]>{
        return await this.productModel.find();
    }
    async getProduct(productID): Promise<Product> {
        return await this.productModel.findById(productID);
    }
    async createProducts(createProductDTO:ProductDTO): Promise<Product> {
        const product = new this.productModel(createProductDTO)
        return await product.save();
    }
    async updateProducts(productID: string, updateProductDTO:ProductDTO): Promise<Product> {
        const update = await this.productModel.findByIdAndUpdate(productID, updateProductDTO,{new:true});
        return update;
    }
    async deleteProducts(productID): Promise<Product> {
        return await this.productModel.findByIdAndDelete(productID);
      
    }
}
