interface CateBtnType {
  text: string
  active: boolean
  subToggle: React.MouseEventHandler
}
// 分类按钮
const CateBtn: React.FC<CateBtnType> = (props: CateBtnType) => {
  const { text, active, subToggle } = props
  return (
    <button
      className={
        'mr-3 px-3.5 py-1 rounded-md bg-[#f5f5f5] text-[#7a7a7b] font-bold text-xl hover:bg-fuchsia-100 hover:text-fuchsia-900' +
        (active ? ' bg-fuchsia-100 text-fuchsia-900' : '')
      }
      onClick={subToggle}
    >
      {text}
    </button>
  )
}

export default CateBtn
