import dayjs from "dayjs";

const useFormatDate2 = (date: Date | string) => {
  return dayjs(date).format('YYYY-MM-DD')
}

export default useFormatDate2
