export type TeamEntity = {
  _id: string
  name: string
  active: boolean
  createdAt: Date
  deleted: boolean
  deletedAt?: Date
}

export type FetchTeamsReturn = {
  teams: TeamEntity[]
  hasNextPage: boolean
}

export type CreateTeamParams = {
  name: string
  path: string
}

export type UpdateTeamParams = {
  teamId: string
  name: string
  path: string
}

export type DeleteTeamParams = {
  teamId: string
  path: string
}
