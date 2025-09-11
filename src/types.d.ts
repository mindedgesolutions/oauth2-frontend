interface MenuProps {
  title: string;
  icon: React.ElementType;
  url?: string;
  children?: SubmenuProps[];
}

interface SubmenuProps {
  title: string;
  url: string;
}

interface UserProps {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

interface FactoryProps {
  id: number;
  name: string;
  location: string;
  website: string;
  created_at: Date;
  updated_at: Date;
}
