export type CrudControllerConfig = {
  paths: {
    getById: string;
    getAll: string;
    create: string;
    edit: string;
    delete: string;
  };
  paramName: 'cardId' | 'gameId' | 'platformId' | 'categoryId'; // e.g. 'cardId' or 'gameId'
  service: {
    getById: (id: string) => Promise<any>;
    getAll: () => Promise<any>;
    create: (input: unknown) => Promise<any>;
    edit: (input: unknown, id: string) => Promise<any>;
    delete: (id: string) => Promise<any>;
  };
};
