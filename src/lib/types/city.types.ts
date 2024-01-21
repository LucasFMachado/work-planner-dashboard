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
