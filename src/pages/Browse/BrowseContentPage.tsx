import { useState } from "react";

interface BrowseContentPageProps {
  meals: any
}

const BrowseContentPage = (props: BrowseContentPageProps) => {
  const [selectedRow, setSelectedRow] = useState<boolean>(false);
  
  const onClickRow = () => {
    setSelectedRow(!selectedRow)
  }

  const renderInfoPanel = () => {
    if (selectedRow) {
      return (
        <div id='container-right'>
          
        </div>
      )
    } else {
      return null
    }
  }
  
  return (
    <div className='browse-root--success'>
      <div id='container-left'>
        <div className='browser-container'>
          <button onClick={onClickRow}>test</button>
        </div>
      </div>
      <div id={`${selectedRow ? 'container-right--active' : 'container-right'}`}>
          
      </div>
    </div>
  )
}

export default BrowseContentPage