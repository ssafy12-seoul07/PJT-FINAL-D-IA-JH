import dayjs from "dayjs";

const useFormatDate2 = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

export default useFormatDate2
