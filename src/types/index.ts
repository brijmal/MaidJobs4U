export interface UserDetails {
  name: string;
  mobile: string;
  age: string;
  languages: string;
  currentAddress: string;
  isSameAddress: boolean;
  address?: {
    houseNo: string;
    street: string;
    locality: string;
    city: string;
    pinCode: string;
  };
  works: string[];
  profilePicture?: File;
}