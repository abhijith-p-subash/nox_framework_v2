import { prop, getModelForClass } from "@typegoose/typegoose";
import { ParentSchema } from "../../../../core/modules/mongo/parent-schema";
import { IProduct } from "./product.type";

export class Product extends ParentSchema implements IProduct {
  @prop({ type: String })
  public name!: string;
}

export const ProductModel = getModelForClass(Product);
