export type CrudControllerConfig = {
  paths: {
    getById: string;
    getAll: string;
    create: string;
    edit: string;
    delete: string;
    like?: string;
    unlike?: string;
  };
  paramName: 'cardId' | 'gameId' | 'platformId' | 'categoryId'; // e.g. 'cardId' or 'gameId'
  service: {
    getById: (id: string) => Promise<any>;
    getAll: (query: Record<string, any>) => Promise<any>;
    create: (input: unknown) => Promise<any>;
    edit: (input: unknown, id: string) => Promise<any>;
    addLike: (id: string, userId: string) => Promise<any>;
    removeLike: (id: string, userId: string) => Promise<any>;
    delete: (id: string) => Promise<any>;
  };
};
