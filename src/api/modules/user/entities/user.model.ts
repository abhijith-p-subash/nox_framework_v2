import { prop, getModelForClass, pre } from "@typegoose/typegoose";
import { ParentSchema } from "../../../../core/modules/mongo/parent-schema";
import { generateHash, uuid } from "../../../../core/utils/helpers";
import { IUser } from "./user.interface";

@pre<User>("save", async function () {
  this.uid = uuid();
  this.active = true;
  this.verified = false;
  if (!!this.first_name && !!this.last_name) {
    this.name = `${this.first_name} ${this.last_name}`;
  }

  if (!!this.password) {
    this.password = await generateHash(this.password);
  }
})
export class User extends ParentSchema implements IUser {
  @prop({ type: String })
  public uid!: string;

  @prop({ type: String, required: true })
  public first_name!: string;

  @prop({ type: String, required: true })
  public last_name!: string;

  @prop({ type: String })
  public name!: string;

  @prop({ type: String, required: true })
  public email!: string;

  @prop({ type: String, required: true })
  public password!: string;

  @prop({ type: String, required: true })
  public phone_code!: string;

  @prop({ type: String, required: true })
  public phone!: string;

  @prop({ type: Boolean })
  public verified!: boolean;
}

export const UserModel = getModelForClass(User);
