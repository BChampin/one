export interface EnvironmentCategoryLink {
  url: string;
  name?: string;
}

export interface EnvironmentCategory {
  name: string;
  links: EnvironmentCategoryLink[];
}

export interface Environment {
  name: string;
  image?: string;
  icon?: string;
  color?: string;
  categories: EnvironmentCategory[];
}
