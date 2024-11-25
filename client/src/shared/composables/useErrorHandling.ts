import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type {
  APIDataResponse,
  APIErrorResponseBody,
} from '../interface/APIInterface'
import { DEFAULT_ERROR, HTTP_STATUS } from '../constants/ErrorConstants'
import { useErrorMessage } from './useErrorMessage'
import axios from 'axios'
import { useErrorDescription } from './useErrorDescription'
import { useErrorHandlers } from './useErrorHandler'

export function useErrorHandling() {
  const { getErrorTitle, getErrorDetail } = useErrorDescription()
  const {
    handleNotFound,
    handleUnauthorized,
    handleForbidden,
    handleBadRequest,
    handleDefaultError,
  } = useErrorHandlers()

  const createResponseError = (
    body: APIErrorResponseBody,
    config?: AxiosRequestConfig
  ): APIErrorResponseBody => {
    return {
      type: body?.type || DEFAULT_ERROR.TYPE,
      title: body?.title || getErrorTitle(body?.status) || DEFAULT_ERROR.TITLE,
      status: body?.status || DEFAULT_ERROR.STATUS,
      detail:
        body?.detail || getErrorDetail(body?.status) || DEFAULT_ERROR.DETAIL,
      instance: config?.url || '',
    }
  }

  const handleSuccessResponse = (
    response: AxiosResponse<APIDataResponse<APIErrorResponseBody>>
  ) => {
    const {
      data: { body },
      status,
    } = response

    if (
      status === HTTP_STATUS.OK &&
      body &&
      body.status &&
      body.status !== HTTP_STATUS.OK
    ) {
      console.log(response)
      const errorBody = createResponseError(body, response.config)
      useErrorMessage(errorBody)

      switch (body.status) {
        case HTTP_STATUS.NOT_FOUND:
          return handleNotFound(errorBody)

        case HTTP_STATUS.UNAUTHORIZED:
          return handleUnauthorized(errorBody)

        case HTTP_STATUS.FORBIDDEN:
          return handleForbidden(errorBody)

        case HTTP_STATUS.BAD_REQUEST:
          return handleBadRequest(errorBody)

        default:
          return handleDefaultError(errorBody)
      }
    }
    return response
  }

  const handleErrorResponse = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
      const { data, config } = error.response

      const errorBody: APIErrorResponseBody = createResponseError(data, config)

      // const errorBody: APIErrorResponseBody = {
      //   type: data?.type || 'about:blank',
      //   title: data?.title || getErrorTitle(status),
      //   status: status,
      //   detail: data?.detail || getErrorDetail(status),
      //   instance: config.url || '',
      // }

      useErrorMessage(errorBody)

      throw new Error('예상치 못한 오류가 발생했습니다')
    }
  }

  return {
    setupInterceptors: (api: AxiosInstance) => {
      api.interceptors.response.use(handleSuccessResponse, handleErrorResponse)
    },
  }
}
