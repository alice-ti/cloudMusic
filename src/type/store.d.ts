export interface SongType {
  name: string
  id: number
  al: {
    picUrl: string
    [name: string]: unknown
  }
  [name: string]: any
}
