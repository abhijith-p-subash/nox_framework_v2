import { Table, Model, Column, DataType } from "sequelize-typescript";
import sequlizeConnection from "../../../../config/database";
import { IGood } from "./good.type";

@Table({
  timestamps: true,
  tableName: "Good",
})
export class Good extends Model implements IGood {
  @Column({
    type: DataType.STRING,
    comment: "Tony",
    allowNull: false,
  })
  name!: string;
}

sequlizeConnection.addModels([Good]);
