export interface APIResponse<APIDataResponse> {
  data: APIDataResponse
  status: string
  error?: string
}

export interface APIDataResponse<T> {
  headers: object
  body: T
  statusCode: string
  statusCodeValue: number
}

export interface APIErrorResponseBody {
  type: string
  title: string
  status: number
  detail: string
  instance: string
}
