import { JwtPayload } from 'jwt-decode'

export interface JwtModel extends JwtPayload {
  userId: string
}
