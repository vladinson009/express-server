import { ZodSchema } from 'zod';
import { Model } from 'mongoose';

import { HttpError } from '../utils/errorParser.js';

export class BaseService<T> {
  constructor(
    private readonly model: Model<T>,
    private readonly createSchema: ZodSchema,
    private readonly editSchema?: ZodSchema
  ) {}

  public getById(id: string) {
    return this.model.findById(id).populate('author');
  }

  public getAll() {
    return this.model.find().populate('author');
  }

  public async create(input: unknown) {
    const parsed = await this.createSchema.safeParseAsync(input);
    if (!parsed.success) {
      throw new HttpError(400, parsed.error.issues.map((i) => i.message).join(', '));
    }
    return this.model.create(parsed.data);
  }

  public async edit(input: unknown, id: string) {
    const schemaToUse = this.editSchema ?? this.createSchema;
    const parsed = await schemaToUse.safeParseAsync(input);
    if (!parsed.success) {
      throw new HttpError(400, parsed.error.issues.map((i) => i.message).join(', '));
    }
    return this.model.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });
  }

  public delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
  public isExist(filter: Record<string, string>) {
    return this.model.findOne(filter);
  }
  //TODO: If edit does not meet requirements
  //   public pushInGameCollection(id: string, value: Record<string, string>) {
  //     return this.model.findByIdAndUpdate(
  //       id,
  //       { $addToSet: value },
  //       { new: true, runValidators: true }
  //     );
  //   }
}
