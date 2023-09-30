import mongoose, { Schema } from "mongoose"

const teamsSchema = new Schema(
  {
    id: String,
    FplId: String,
    ManagerName: String,
    TeamName: String,
    Win: String,
    Draw: String,
    Lose: String,
    Points: String,
    TotalScore: String,
    Played: String,
    group: Number,
  },
  {
    timestamps: true,
  }
)

const Teams = mongoose.models.Teams || mongoose.model("Teams", teamsSchema)

export default Teams
