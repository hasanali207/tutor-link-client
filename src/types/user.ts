export interface IUser {
  _id: string;
  name?: string;
  address?: string;
  phone?: string;
  image?:string;
  email: string;
  password?: string;
  role: "Student" | "Tutor";
  isBlocked?: boolean;
  isDeleted?: boolean;
  bio?: string;
  price?: number;
  subjects?: string;
  gradeLevel?: string;
  averageRating?: number;
  profilePicture?: string;
  availability?: {
    from: Date;
    to: Date; 
  };
  createdAt?: Date;
  updatedAt?: Date;
}
