import Player from '@/store/features/player/Player'

const player = new Player()

const proxy = new Proxy(player, {
  set(target, key, value) {
    return Reflect.set(target, key, value)
  },
})
export default proxy
