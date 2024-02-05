export type CityEntity = {
  _id: string
  protocol: number
  name: string
  active: boolean
  createdAt: Date
  deleted: boolean
  deletedAt?: Date
}

export type CreateCityParams = {
  name: string
  path: string
}

export type CitiesListOption = {
  label: string
  value: string
}

export type FetchCitiesListReturn = {
  cities: CitiesListOption[]
}
