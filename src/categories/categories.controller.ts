import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category-dto';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService){}


    @Get('')
    getCategories(): Promise<Category[]> {
        return this.categoriesService.getCategories();
    }

    @Post()
    @UsePipes(ValidationPipe)
    addCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.addCategory(createCategoryDto);
    }

    @Put('/toggleActive/:id')
    editCategoryActivityById(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return this.categoriesService.editCategoryActivityById(id);
    }
}
