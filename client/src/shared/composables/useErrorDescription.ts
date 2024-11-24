export function useErrorDescription() {
  const getErrorTitle = (status: number): string => {
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

  const getErrorDetail = (status: number): string => {
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

  return {
    getErrorTitle,
    getErrorDetail,
  }
}
