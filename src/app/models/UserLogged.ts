export interface UserLogged{
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: "female" | "male";
    image: string;
    token: string;
  }