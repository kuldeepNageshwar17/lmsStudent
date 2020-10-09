import React, { useState, useEffect } from 'react'

export const GridContext = React.createContext({
  currentPage: 1,
  pageCount: 2
})

// export const GridItem = React.createContext({})

export const Grid = ({ data, children, pageCount, paging }) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [currentItems, setCurrentItems] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const nextPage = () => {
    debugger;
    if (data && data.length > currentPage * pageCount) {
      setCurrentPage(currentPage + 1)
    }
  }
  const previousPage = () => {
    debugger;
    if (data && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const setPage = (page) => {
    debugger;
    if (data && page > 0 && page <= totalPages) {
      setCurrentPage(currentPage - 1)
    }
  }
  useEffect(()=>{
    // settotalRecords(data.length)
    if(data.length%pageCount>0){
      setTotalPages(data.length/pageCount+1)

    }
    else{
      setTotalPages(data.length)

    }
        // eslint-disable-next-line react-hooks/exhaustive-deps

  },[data, pageCount])

  useEffect(() => {
    debugger;
    var currentItems=data.slice((currentPage-1)* pageCount,currentPage*pageCount)
     setCurrentItems(currentItems);    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageCount, data, pageCount])
  return (
    <>
      <GridContext.Provider value={{ currentPage,nextPage,previousPage,setPage,totalPages,pageCount, }}>
        {currentItems.map((item, index) => (
          <React.Fragment key={index}>
            {React.cloneElement(children, { ...item })}
            {/* {children(item)} */}
          </React.Fragment>
        ))}
        {paging(nextPage,previousPage,setPage,totalPages,pageCount,currentPage)}
      </GridContext.Provider>
    </>
  )
}
