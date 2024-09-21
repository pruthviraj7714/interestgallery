export interface PostType {
  category: string;
  createdAt: Date;
  description: string;
  id: string;
  image: string;
  title: string;
  user: { username: string };
  userId: string;
  isSaved : boolean;
}

export interface CommentType {
  createdAt: Date;
  id: string;
  postId: string;
  text: string;
  user: { id : string; username: string; firstname: string; lastname: string };
  userId: string;
}

export interface PinType {
  category: string;
  createdAt: Date;
  description: string;
  id: string;
  image: string;
  title: string;
  userId: string;
  comments: CommentType[];
  user: {
    id : string;
    firstname: string;
    lastname: string;
    username: string;
  };
}
