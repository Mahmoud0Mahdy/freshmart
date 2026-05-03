export const decodeToken = (token: string) => {
  const payload = JSON.parse(atob(token.split(".")[1]));

  return {
    userId:
      payload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
    role:
      payload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
  };
};