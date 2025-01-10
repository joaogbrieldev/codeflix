import { ICategoryRepository } from "src/domain/contracts/repositories/category.repository";
import { ICreateCategoryInput, ICreateCategoryOutput, ICreateCategoryUseCase } from "src/domain/contracts/use-cases/category/create/create-category";
import { Category } from "src/domain/entities/category.entity";

export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(private readonly _categoryRepository: ICategoryRepository){}
  async execute(input: ICreateCategoryInput): Promise<ICreateCategoryOutput> {
    const entity = Category.create(input);
    await this._categoryRepository.create(entity);  
    return {
      id: entity.category_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at
    };
  }
} 
