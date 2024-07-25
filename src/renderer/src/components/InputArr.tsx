import { useState } from 'react'
import Icon from './icon'
import { Icon_type } from '@common/gloabl'
import { useLang } from '@renderer/libs/AppContext'

interface InputArrProps {
  value: string[]
  placeholder?: string
  onChange?: (newValue: string[]) => void // 添加一个onChange回调函数来传递数据
}

export default function InputArr(props: InputArrProps) {
  const lang = useLang()
  const [inputs, setInputs] = useState<string[]>(props.value || [''])

  const handleInputChange = (index: number, newValue: string) => {
    const newInputs = [...inputs]
    newInputs[index] = newValue
    setInputs(newInputs)
    props.onChange(newInputs) // 当输入改变时，调用onChange回调函数
  }

  const handleAddInput = () => {
    setInputs([...inputs, ''])
    props.onChange([...inputs, '']) // 添加新输入时，更新外部状态
  }

  const handleRemoveInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index)
    setInputs(newInputs)
    props.onChange(newInputs) // 移除输入时，更新外部状态
  }

  return (
    <div className="flex flex-col">
      <div className=" flex flex-col">
        {inputs.map((input, index) => (
          <div key={index} className="flex flex-row items-center">
            <div className="flex flex-col flex-grow">
              <input
                type="text"
                placeholder={props.placeholder || ''}
                value={input}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
            <Icon
              className="w-[20px] h-[20px]"
              type={Icon_type.icon_del}
              svg
              onClick={() => handleRemoveInput(index)}
            />
          </div>
        ))}
      </div>
      <div
        onClick={handleAddInput}
        className="flex flex-row space-x-1 items-center bg-gray-300 rounded-lg border-[1px] px-3 py-1"
      >
        <Icon type={Icon_type.icon_add} />
        <div>{lang.getLangText('inputarr.addmore')}</div>
      </div>
    </div>
  )
}
