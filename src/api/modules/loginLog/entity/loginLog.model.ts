import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { ParentSchema } from "../../../../core/modules/mongo/parent-schema";
import { User } from "../../user/entities/user.model";

export class LoginLog extends ParentSchema implements ILoginLog {
  @prop({ type: String })
  public user_id!: string;

  @prop({ type: String })
  public user_name!: string;
}

export const LoginLogModel = getModelForClass(LoginLog);
