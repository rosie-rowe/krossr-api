import * as sequelize from "sequelize";

export interface IKrossrDatabase {
    sequelize?: sequelize.Sequelize;
    Sequelize?: sequelize.SequelizeStatic;
    // TODO typing
    user?: sequelize.Model<any, any>;
    level?: sequelize.Model<any, any>;
    rating?: sequelize.Model<any, any>;
}