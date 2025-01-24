import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CategoryOutput } from 'src/core/data/use-cases/category/common/category-output';
import { ICreateCategoryUseCase } from 'src/core/domain/contracts/use-cases/category/create/create-category';
import { IDeleteCategoryUseCase } from 'src/core/domain/contracts/use-cases/category/delete/delete-category.use-case';
import { IGetCategoryUseCase } from 'src/core/domain/contracts/use-cases/category/get-category/get-category';
import { IListCategoriesUseCase } from 'src/core/domain/contracts/use-cases/category/list-categories/list-categories';
import { IUpdateCategoryInput, IUpdateCategoryUseCase } from 'src/core/domain/contracts/use-cases/category/update/update-category';
import { CategoryCollectionPresenter, CategoryPresenter } from './categories.presenter';
import { CreateCategoryInputDto } from './dto/create-category.dto';
import { SearchCategoriesDto } from './dto/search-categories.dto';

@Controller('category')
export class CategoriesController {
  private _createCategoryUseCase: ICreateCategoryUseCase;
  private _updateCategoryUseCase: IUpdateCategoryUseCase;
  private _deleteCategoryUseCase: IDeleteCategoryUseCase;
  private _findByIdCategoryUseCase: IGetCategoryUseCase;
  private _getAllCategories: IListCategoriesUseCase;

  constructor() {}

  @Post('/')
  async create(@Body() createCategoryDto: CreateCategoryInputDto) {
    const output = await this._createCategoryUseCase.execute(createCategoryDto);
    return CategoriesController.serialize(output);
  }

  @Get()
  async search(@Query() searchParamsDto: SearchCategoriesDto) {
    const output = await this._getAllCategories.execute(searchParamsDto)
    return new CategoryCollectionPresenter(output);
  }

  @Get(':id')
  async findOne(@Param('id',  new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string) {
    const output = await this._findByIdCategoryUseCase.execute({id})
    return CategoriesController.serialize(output);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateCategoryDto: IUpdateCategoryInput,
  ) {
    const output = await this._updateCategoryUseCase.execute({...updateCategoryDto, id})
    return CategoriesController.serialize(output);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string) {
    await this._deleteCategoryUseCase.execute({id})
  }

  static serialize(output: CategoryOutput){
    return new CategoryPresenter(output);
  }

}
