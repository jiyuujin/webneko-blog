interface Person {
  name: string;
  title: string;
  company: string;
  shortBio: string;
  email: string;
  phone: string;
  facebook: string;
  twitter: string;
  github: string;
  image: string;
}

interface Sys {
  contentType: {
    sys: {
      id: string;
      linkType: string;
      type: string;
    }
  };
  createdAt: string;
  environment: {
    sys: {
      id: string;
      linkType: string;
      type: string;
    }
  };
  id: string;
  locale: string;
  revision: number;
  space: {
    sys: {
      id: string;
      linkType: string;
      type: string;
    }
  };
  type: string;
  updatedAt: string;
}

export interface Post {
  title: string;
  slug: string;
  heroImage: string;
  description: string;
  body: string;
  author: {
    fields: Person,
    sys: Sys
  };
  publishDate: string;
  tags: string[];
  category: string;
}

export interface PostItem {
  fields: Post;
  sys: Sys;
}

export interface Posts {
  items: PostItem[]
}

export interface Param {
  slug: string;
  ym: string;
}
