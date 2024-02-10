export type FetchDashboardDataReturn = {
  totalProtocols: number
  cityProtocols: {
    protocolsCount: number
    city: string
  }[]
}
