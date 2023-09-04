import React from "react";
import "./paginate.css";
import { useEffect } from "react";


const Paginate = ({ gamesPage, allGames, currentPage, paginate,handlePageChange  }) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allGames / gamesPage); i++) {
    pageNumbers.push(i + 1);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
      handlePageChange(currentPage - 1); 
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
      handlePageChange(currentPage + 1); 
    }
  };

  
useEffect(() => {
    console.log("Current Page:", currentPage);
  }, [currentPage]);

  return (
    <div>
      <nav>
        <ul className="nav-paginate--ul">
          <div>
            <button
       className={`nav-paginate-cnt--list ${currentPage === 1 ? 'active current-page' : ''}`}
       onClick={handlePrevClick}
            >
              ◀
            </button>
          </div>

          {pageNumbers.map((num) => (
            <li className="nav-paginate-cnt" key={num}>
              <button
                    href="#top"
                    className={`nav-paginate-cnt--list2 ${num === currentPage ? 'active-page' : ''}`}
                    onClick={() => paginate(num)}
              >
                {num}
              </button>
            </li>
          ))}

          <div>
            <button
         className={`nav-paginate-cnt--list2 ${currentPage === pageNumbers.length ? 'active current-page' : ''}`}
         onClick={handleNextClick}
            >
              ▶
            </button>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Paginate;
