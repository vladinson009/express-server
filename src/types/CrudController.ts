import { Document, Query } from 'mongoose';

export type CrudService<T extends Document> = {
  getById: (id: string) => Query<T | null, T>;
  getAll: () => Promise<any>;
  create: (input: unknown) => Promise<any>;
  edit: (input: unknown, id: string) => Promise<any>;
  delete: (id: string) => Promise<any>;
};

export interface CrudController<T extends Document> {
  paths: {
    getById: string;
    create: string;
    edit: string;
    delete: string;
  };
  service: CrudService<T>;
}
