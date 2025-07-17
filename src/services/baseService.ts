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
    return this.model.findById(id).populate('author', 'username email');
  }
  public async getAll(rawQuery: Record<string, any> = {}) {
    const query: Record<string, any> = {};

    const page = parseInt(rawQuery.page) || 1;
    const limit = parseInt(rawQuery.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = rawQuery.sortBy || 'createdAt';
    const order = rawQuery.order === 'asc' ? 1 : -1;

    const { page: _, limit: __, sortBy: ___, order: ____, ...filtersRaw } = rawQuery;

    for (const [key, value] of Object.entries(filtersRaw)) {
      if (!value) {
        continue;
      }
      if (key === 'priceLimit') {
        query[key] = { $lte: Number(value) };
      } else {
        const safeValue = Array.isArray(value) ? value[0] : value;
        query[key] = { $regex: safeValue, $options: 'i' };
      }
    }

    const dataFormat = this.model
      .find(query)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username email')
      .populate('likes', 'username');
    const totalDocuments = this.model.countDocuments(query);
    const [data, total] = await Promise.all([dataFormat, totalDocuments]);
    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
  public addLike(itemId: string, userId: string) {
    return this.model.findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: userId } },
      { new: true, runValidators: true }
    );
  }
  public removeLike(itemId: string, userId: string) {
    return this.model.findByIdAndUpdate(
      itemId,
      { $pull: { likes: userId } },
      { new: true, runValidators: true }
    );
  }
}
