import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'

/**
 * @description 格式化时间
 * @param Milliseconds 毫秒数
 * @param format 默认 'HH:MM:SS'
 * @returns 默认返回 'HH:MM:SS' 格式
 */
const formatTime = (Milliseconds: number, format = 'HH:MM:SS'): string => {
  if (Milliseconds === 0) return ''
  dayjs.extend(duration)
  dayjs.extend(relativeTime)

  const time = dayjs.duration(Milliseconds)
  const hours = time.hours().toString()
  const mins = time.minutes().toString()
  const seconds = time.seconds().toString().padStart(2, '0')

  if (format === 'HH:MM:SS') {
    return hours !== '0' ? `${hours}:${mins.padStart(2, '0')}:${seconds}` : `${mins}:${seconds}`
  }
  return ''
}

export { formatTime }
