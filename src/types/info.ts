export interface Info {
  id?: string;
  username?: string;
  access_token?: string;
  showName?: string
}

export interface Share {
  productId: string;
  shareAmount: number;
  profit: number;
  purchaseDate: string
}

export interface Product {
  id: string;
  code?: string;
  name?: string;
  icon?: string;
  description?: string;

}