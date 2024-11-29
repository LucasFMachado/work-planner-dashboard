'use server'

import { revalidatePath } from 'next/cache'

import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from '../constants'
import Team from '../models/team.model'
import { connectToDB } from '../mongoose'
import {
  CreateTeamParams,
  DeleteTeamParams,
  FetchTeamsReturn,
  TeamEntity,
  UpdateTeamParams,
} from '../types/team.types'

export async function fetchTeams(
  pageNumber = INITIAL_PAGE,
  pageSize = INITIAL_PAGE_SIZE,
): Promise<FetchTeamsReturn> {
  try {
    connectToDB()

    const skipAmount = (pageNumber - 1) * pageSize

    const teams: TeamEntity[] = await Team.find({
      deleted: false,
    })
      .sort({ createdAt: 'asc' })
      .skip(skipAmount)
      .limit(pageSize)

    const totalTeams = await Team.countDocuments({
      deleted: false,
    })
    const hasNextPage = totalTeams > skipAmount + teams.length

    return {
      teams,
      hasNextPage,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch teams: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function fetchTeam(teamId: string): Promise<TeamEntity> {
  try {
    connectToDB()

    const team = await Team.findById(teamId)

    return team
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch team: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function createTeam({ name, path }: CreateTeamParams) {
  try {
    connectToDB()

    await Team.create({
      name,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to create team: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function updateTeam({ teamId, name, path }: UpdateTeamParams) {
  try {
    connectToDB()

    await Team.findByIdAndUpdate(teamId, {
      name,
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to update team: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}

export async function deleteTeam({
  teamId,
  path,
}: DeleteTeamParams): Promise<void> {
  try {
    connectToDB()

    await Team.findByIdAndUpdate(teamId, {
      deleted: true,
      deletedAt: new Date(),
    })

    revalidatePath(path)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(`Failed to delete team: ${error.message}`)
    }
    throw new Error(`Internal server error: ${error}`)
  }
}
