import { message } from 'ant-design-vue'
import type { APIErrorResponseBody } from '../interface/APIInterface'

export function useErrorMessage(errorBody: APIErrorResponseBody) {
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
