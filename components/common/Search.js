import Image from 'next/image'
import search_img from '../../public/images/search.svg'
import React from 'react'
const Search = () => {
  return (
    <>
    <form>
          <div className=" position-relative search">
                <div className="input-group-prepend">
                    <button type="submit" className="">
                         <Image src={search_img} alt="search" width="16" height="16" />
                    </button>
                </div>
                <input type="search" placeholder="Search..." className="form-control" />
            
          </div>
      </form>
    </>
  )
}

export default Search