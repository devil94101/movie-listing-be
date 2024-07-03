export interface ErrorParam extends Error {
  status: number;
}

export type JWTPayloadType = {
  email: string;
  name: string;
  id: number;
};
