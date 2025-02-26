import IconSearch from "@/public/icons/IconSearch";
import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

function SearchToggle() {
	
  const [searchOpened, setsearchOpened] = useState(false);

  const SearchRef = useRef(null);

  const ref = useRef();

  const router = useRouter();

  useOnClickOutside(ref, () => {
    if (searchOpened) {
      setsearchOpened(false);
    }
  });

  const inputToggleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (SearchRef.current)  {
      const searchValue = SearchRef.current.value; 
      setsearchOpened(!searchOpened); 

      if (searchValue) {
        router.push(`/productListing?filter=${encodeURIComponent(searchValue)}`);
        SearchRef.current.value = ''
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputToggleSubmit(e);
    }
  };

  return (
    <div className={searchOpened ? "search_li opened" : "search_li"} ref={ref}>
      <input  onKeyDown={handleKeyDown} type="text" ref={SearchRef} placeholder="Search ..." />
      <a href="/#" className="search_btn" onClick={(e) => inputToggleSubmit(e)}>
        <IconSearch
          className={`${
            searchOpened
              ? "text-black [&>path]:fill-siteCrem"
              : "text-white [&>path]:fill-white"
          } [&>path]:duration-300`}
        />
      </a>
    </div>
  );
}

export default SearchToggle;
