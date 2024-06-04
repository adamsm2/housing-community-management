import { UserDataResource } from "@/api/dto/UserDataResource.ts";

export interface UserContextType {
  userData: UserDataResource;
  setCurrentUser: (newUser: UserDataResource) => void;
}