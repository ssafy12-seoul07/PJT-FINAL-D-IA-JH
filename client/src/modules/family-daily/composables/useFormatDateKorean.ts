const useFormatDateKorean = () => {
  const getDayKorean = (day: number) => {
    const days = ['일', '월', '화', '수', '목', '금', '토']
    return days[day]
  }

  const getFormattedDate = (date: Date = new Date()) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 (${getDayKorean(date.getDay())}) 오늘`
  }

  const getTodayFormatted = () => {
    return getFormattedDate(new Date())
  }

  return {
    getDayKorean,
    getFormattedDate,
    getTodayFormatted,
  }
}

export default useFormatDateKorean
