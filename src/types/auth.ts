export type RegisterRequestDto = {
  email: string;
  name: string;
  password: string;
};

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type AuthResponseDto = {
  accessToken: string;
  tokenType: "Bearer";
};