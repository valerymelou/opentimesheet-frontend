import { BaseModel } from '../core/base-model';

export class Credentials extends BaseModel {
  type = 'TokenObtainPairView';
  public email?: string;
  public password?: string;
}
