import react from "react"
import OptionsCardComponent from "../OptionsCardComponent/OptionsCardComponent"

export interface QCardComponentProps {
    title: string,
    description: string
}

const QCardComponent = () => {
  return (
    <div><OptionsCardComponent /></div>
  )
}

export default QCardComponent