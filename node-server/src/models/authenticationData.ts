interface IAuthenticationData {
  authenticated: boolean;
  iss: string;
  facility: string[];
  roles: string[];
}

export default IAuthenticationData;
