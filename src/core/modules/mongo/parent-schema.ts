import { prop, getModelForClass } from "@typegoose/typegoose";

export class ParentSchema {
  //   @prop({ type: String, required: true })
  //   public _id!: string;

  @prop({ type: Boolean })
  public active!: Boolean;

  @prop({ type: Date, required: true })
  public created_at!: Date;

  @prop({ type: String, required: true })
  public created_by!: string;

  @prop({ type: Date, required: true })
  public updated_at!: Date;

  @prop({ type: String, required: true })
  public updated_by!: string;
}

export const UserModel = getModelForClass(ParentSchema);
