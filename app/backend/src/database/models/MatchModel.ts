import { Model, INTEGER } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';

class MatchModel extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

MatchModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  homeTeam: {
    type: INTEGER,
  },

  homeTeamGoals: {
    type: INTEGER,
  },

  awayTeam: {
    type: INTEGER,
  },

  awayTeamGoals: {
    type: INTEGER,
  },

  inProgress: {
    type: INTEGER,
  },

}, {
  sequelize: db,
  underscored: true,
  modelName: 'matches',
  timestamps: false,
});

TeamModel.hasMany(MatchModel, {
  foreignKey: 'homeTeam', as: 'teamHome',
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'homeTeam', as: 'teamHome',
});

TeamModel.hasMany(MatchModel, {
  foreignKey: 'awayTeam', as: 'teamAway',
});

MatchModel.belongsTo(TeamModel, {
  foreignKey: 'awayTeam', as: 'teamAway',
});

export default MatchModel;
