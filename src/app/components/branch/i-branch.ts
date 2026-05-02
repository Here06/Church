export interface Branch {
  image: string | undefined;
  id: string;
  name: string;
  imagePath?: string;
  pastor?: { title: string; lastName: string; initials: string };
  address?: { googleLink?: string };
  service?: string;
  contact?: { phone?: string; email?: string };
}
