import { prop, getModelForClass } from "@typegoose/typegoose";
import { ParentSchema } from "../../../../core/modules/mongo/parent-schema";

export class Product extends ParentSchema implements IProduct {
  @prop({ type: String })
  public name!: string;
}

export const ProductModel = getModelForClass(Product);
