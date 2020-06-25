import * as sequelize from "sequelize";

export interface IKrossrDatabase {
    sequelize?: sequelize.Sequelize;
    user?: sequelize.Model<any, any>;
}