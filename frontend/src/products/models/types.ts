interface ProductType {
  id: number;
  title: string;
  price: number;
  description?: string;
  thumbnail: string;
}

interface ApiResponse {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
}
