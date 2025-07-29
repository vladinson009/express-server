export const usersPath = {
  root: '/users',
  login: '/login',
  register: '/register',
  logout: '/logout',
  me: '/me',
  getAll: '',
  changeRole: '/role/:userId',
  deleteUser: '/delete/:userId',
};
export const cardsPath = {
  root: '/cards',
  create: '/create',
  edit: '/edit/:cardId',
  delete: '/delete/:cardId',
  getById: '/:cardId',
  getAll: '',
  like: '/like/:cardId',
  unlike: '/unlike/:cardId',
};
export const gamesPath = {
  root: '/games',
  create: '/create',
  edit: '/edit/:gameId',
  delete: '/delete/:gameId',
  getById: '/:gameId',
  getAll: '',
  like: '/like/:gameId',
  unlike: '/unlike/:gameId',
};
export const categoriesPath = {
  root: '/categories',
  create: '/create',
  edit: '/edit/:categoryId',
  delete: '/delete/:categoryId',
  getById: '/:categoryId',
  getAll: '',
};
export const platformsPath = {
  root: '/platforms',
  create: '/create',
  edit: '/edit/:platformId',
  delete: '/delete/:platformId',
  getById: '/:platformId',
  getAll: '',
};
