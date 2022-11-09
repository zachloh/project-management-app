export {};

// Add custom properties to the Request type
declare global {
  namespace Express {
    export interface Request {
      orgId?: string;
    }
  }
}
