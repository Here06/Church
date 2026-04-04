export interface Branch {
  id: string;
  name: string;
  image?: string;
  address?: string | { googleLink?: string };
  region?: string;
  district?: string;
  pastor?: any; // DocumentReference or Pastor object once resolved
  service?: string;
  contact?: { phone?: string; email?: string };
}
