export type CityEntity = {
  _id: string
  protocol: number
  name: string
  active: boolean
  createdAt: Date
  deleted: boolean
  deletedAt?: Date
}

export type FetchCitiesReturn = {
  cities: CityEntity[]
  hasNextPage: boolean
}

export type CreateCityParams = {
  name: string
  path: string
}

export type UpdateCityParams = {
  cityId: string
  name: string
  path: string
}

export type DeleteCityParams = {
  cityId: string
  path: string
}

export type CitiesListOption = {
  label: string
  value: string
}

export type FetchCitiesListReturn = {
  cities: CitiesListOption[]
}
