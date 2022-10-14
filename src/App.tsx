import React, { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from './hook';
import { getSearch } from './redux/action/search';
const useDebounce = (value: string, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState<string>();
  const timer = useRef<any>(null);
  useEffect(() => {
    timer.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timer.current);
  }, [value, delay]);

  return debouncedValue;
};
const App = () => {
  const [textValueSearch, setTextValueSearch] = useState<string>("");
  const debouncedText: any = useDebounce(textValueSearch);
  const dispatch = useAppDispatch();
  const searchData = useAppSelector((state: any) => state.search.search);
  useEffect(() => {
    if (debouncedText?.length > 0 || debouncedText?.length === 0) {
      dispatch(getSearch(debouncedText))
    }
  }, [debouncedText]);
  return (
    <>
      
      <div className="search">
        <input
          type="text"
          value={textValueSearch}
          onChange={(e) => {
            setTextValueSearch(e.target.value);
          }}
          autoFocus={textValueSearch?.length ? true : false}
          autoComplete="on|off"
          className="searchTerm"
          placeholder="What are you looking for?" />
      </div>
      { (textValueSearch !== "") &&  
      <div style={{ display: 'block',  maxWidth:'600px',margin:'0 auto',    textAlign: "center" ,   maxHeight: "90vh", overflow: "auto" }}>
        {
          searchData && searchData?.items && searchData?.items?.length > 0 ? searchData?.items?.map((item: any, i: number) => {
            return (
              <div key={i}>
                <div style={{ border: "1px solid #9DBFAF", padding:"15px" }}>
                  <h3>{item?.name}</h3>
                  <h4>{item?.stargazers_count}</h4>
                  <h4>{item?.watchers_count}</h4>
                </div>
              </div>
            )
          }) : null
        }
      </div>
    }
    </>
  )
}

export default App