export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

export const DEFAULT_ERROR = {
  TYPE: 'about:blank',
  TITLE: '시스템 오류',
  DETAIL: '예상치 못한 오류가 발생했습니다',
  STATUS: HTTP_STATUS.INTERNAL_SERVER_ERROR,
} as const
 