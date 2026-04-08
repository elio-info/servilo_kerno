import { Categorie_Entity, API_Struct } from './categorie.entity';

// Sample data for API_Struct
export const sampleAPI_Structs: API_Struct[] = [
  {
    nameAPI: 'Get',
    linkAPI: '/api/categories',
    nameMenuTitle: 'List Categories',
    isActive: true,
  },
  {
    nameAPI: 'Post',
    linkAPI: '/api/categories',
    nameMenuTitle: 'Create Category',
    isActive: true,
  },
  {
    nameAPI: 'Put',
    linkAPI: '/api/categories/:id',
    nameMenuTitle: 'Update Category',
    isActive: true,
  },
  {
    nameAPI: 'Delete',
    linkAPI: '/api/categories/:id',
    nameMenuTitle: 'Delete Category',
    isActive: false,
  },
];

// Sample data for Categorie_Entity
export const sampleCategorie_Entities: Categorie_Entity[] = [
  {
    id: '1',
    name: 'User Management',
    nameTitle: 'Users',
    link: '/users',
    access_point: [sampleAPI_Structs[0], sampleAPI_Structs[1]], // Get and Post
    isDeleted: false,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-01T00:00:00Z'),
  },
  {
    id: '2',
    name: 'Product Catalog',
    nameTitle: 'Products',
    link: '/products',
    access_point: sampleAPI_Structs, // All API structs
    isDeleted: false,
    createdAt: new Date('2023-02-01T00:00:00Z'),
    updatedAt: new Date('2023-02-15T00:00:00Z'),
  },
];