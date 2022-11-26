import Icon from '@/components/SvgIcon'

const PlayerSetting: React.FC = () => {
  return (
    <>
      <div className="min-w-[15%] flex flex-row">
        <Icon name="sequence" />
        <Icon name="volume" />
        <Icon name="fold" />
      </div>
    </>
  )
}

export default PlayerSetting
