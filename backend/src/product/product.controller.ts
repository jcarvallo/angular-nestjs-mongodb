import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';

import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get('/')
    async getAll(@Res() res){
        const data= await this.productService.getProducts()
        return res.status(HttpStatus.OK).json(data)
    }
    @Get('/:productID')
    async getById(@Res() res, @Param('productID') productID) {
        const data = await this.productService.getProduct(productID)
        if (!data) throw new NotFoundException('Producto no existente');
        return res.status(HttpStatus.OK).json(data);
    }

    @Post('/create')
    async create(@Res() res, @Body() createProductDTO: ProductDTO) {
        const create = await this.productService.createProducts(createProductDTO)
        return res.status(HttpStatus.OK).json({
            messeger: 'Se a creado el producto',
            data:create
        })
    }

    @Put('/update')
    async update(@Res() res, @Body() updateProductDTO: ProductDTO, @Query('productID') productID){
        const update= await this.productService.updateProducts(productID,updateProductDTO)
        if (!update) throw new NotFoundException('Producto no existente');
        return res.status(HttpStatus.OK).json({messeger:'El producto se a editado',update});
    }

    @Delete('/delete')
    async delete(@Res() res, @Query('productID') productID){
        const deleteProd= await this.productService.deleteProducts(productID);
        if (!deleteProd) throw new NotFoundException('Producto no existente');
        return res.status(HttpStatus.OK).json({ messeger: 'El producto se  a eliminado', deleteProd });

    }
}
