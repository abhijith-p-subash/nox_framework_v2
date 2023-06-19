import { prop, getModelForClass } from "@typegoose/typegoose";

export class User {
  @prop({ type: String })
  public name?: string;
}

export const UserModel = getModelForClass(User);
