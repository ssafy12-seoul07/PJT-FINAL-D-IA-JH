import { useAuthStore } from '@/modules/authentication/store/auth'
import { useRouter } from 'vue-router'
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import type {
  APIDataResponse,
  APIErrorResponseBody,
} from '../interface/APIInterface'

export class CustomError extends Error {
  constructor(
    message: string,
    public status: number,
    public errorBody: APIErrorResponseBody,
    public errorResponse?: APIDataResponse<APIErrorResponseBody>
  ) {
    super(message)
    this.name = 'CustomError'
  }
}

export class ErrorHandlingService {
  private static authStore = useAuthStore()
  private static router = useRouter()

  static handleSuccessResponse(
    response: AxiosResponse<APIDataResponse<APIErrorResponseBody>>
  ) {
    const { data, status } = response

    if (status === 200 && data.statusCodeValue !== 200) {
      const errorBody: APIErrorResponseBody = {
        type: 'about:blank',
        title: data.body.title || '알 수 없는 오류',
        status: 200,
        detail: data.body.detail || '서비스 처리 중 오류가 발생했습니다',
        instance: response.config.url || '',
      }
      console.log(response)
      this.showErrorMessage(errorBody)
      throw new CustomError(
        data.body.detail || '서비스 처리 중 오류가 발생했습니다',
        200,
        errorBody
      )
    }

    return response
  }

  static handleErrorResponse(error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data, headers, config } = error.response

      const errorBody: APIErrorResponseBody = {
        type: data.body?.type || 'about:blank',
        title: data.body?.title || this.getDefaultErrorTitle(status),
        status: status,
        detail: data.body?.detail || this.getDefaultErrorDetail(status),
        instance: config.url || '',
      }

      const errorResponse: APIDataResponse<APIErrorResponseBody> = {
        headers: headers,
        body: errorBody,
        statusCode: status.toString(),
        statusCodeValue: status,
      }

      this.showErrorMessage(errorBody)

      switch (status) {
        case 404:
          throw new CustomError(
            errorBody.detail,
            status,
            errorBody,
            errorResponse
          )

        case 401:
          this.authStore.deleteAccessToken()
          this.router.push({ name: 'Login' })
          throw new CustomError(
            errorBody.detail,
            status,
            errorBody,
            errorResponse
          )

        case 403:
          throw new CustomError(
            errorBody.detail,
            status,
            errorBody,
            errorResponse
          )

        case 400:
          throw new CustomError(
            errorBody.detail,
            status,
            errorBody,
            errorResponse
          )

        default:
          throw new CustomError(
            errorBody.detail,
            status || 500,
            errorBody,
            errorResponse
          )
      }
    }

    // 기타 예상치 못한 에러
    const genericErrorBody: APIErrorResponseBody = {
      type: 'about:blank',
      title: '시스템 오류',
      status: 500,
      detail: '예상치 못한 오류가 발생했습니다',
      instance: '',
    }

    throw new CustomError(
      '예상치 못한 오류가 발생했습니다',
      500,
      genericErrorBody
    )
  }

  private static showErrorMessage(errorBody: APIErrorResponseBody) {
    const messageContent = {
      content: errorBody.detail,
      duration: 3,
    }

    switch (errorBody.status) {
      case 400:
        message.warning(messageContent)
        break
      case 401:
        message.error({
          ...messageContent,
          content: '로그인이 필요합니다. 로그인 페이지로 이동합니다.',
        })
        break
      case 403:
        message.error(messageContent)
        break
      case 404:
        message.warning(messageContent)
        break
      case 500:
        message.error(messageContent)
        break
      default:
        message.error(messageContent)
    }
  }

  private static getDefaultErrorTitle(status: number): string {
    switch (status) {
      case 400:
        return '잘못된 요청'
      case 401:
        return '인증 오류'
      case 403:
        return '권한 없음'
      case 404:
        return '리소스 없음'
      default:
        return '서버 오류'
    }
  }

  private static getDefaultErrorDetail(status: number): string {
    switch (status) {
      case 400:
        return '요청 형식이 잘못되었습니다'
      case 401:
        return '인증이 필요하거나 만료되었습니다'
      case 403:
        return '해당 리소스에 대한 권한이 없습니다'
      case 404:
        return '요청하신 리소스를 찾을 수 없습니다'
      default:
        return '서버 처리 중 오류가 발생했습니다'
    }
  }

  static setupInterceptors(api: AxiosInstance) {
    api.interceptors.response.use(
      this.handleSuccessResponse,
      this.handleErrorResponse
    )
  }
}
