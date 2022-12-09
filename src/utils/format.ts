import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTC(
  utcString: string,
  format: string = 'YYYY/MM/DD HH:mm:ss',
) {
  //+8小时
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}
