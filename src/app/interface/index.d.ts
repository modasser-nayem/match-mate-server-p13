import { JwtPayload } from "jsonwebtoken";

interface ExtendedJwtPayload extends JwtPayload {
  id: string;
}

interface JwtGroupPayload extends JwtPayload {
  userId: string;
  groupId: string;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user: ExtendedJwtPayload;
      group: JwtGroupPayload;
    }
  }
}
