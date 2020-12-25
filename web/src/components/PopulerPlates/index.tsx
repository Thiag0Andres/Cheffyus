import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Hidden from "@material-ui/core/Hidden";
import { BsArrowLeft, BsArrowRight,BsFillStarFill,BsFillClockFill, BsGridFill } from "react-icons/bs";
import foodNotFound from "../../images/foodNotFound.jpg";

import "./styles.scss";

import api from "../../services/api";

const PopularPlates: React.FC = ({}) => {

  const [chefs, setChefs] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPerPage, setCategoryPerPage] = useState(3);

  useEffect(() => {
    // FIXME: This is not the way to achieve side effects in component 
    const url = "https://mycheffy.herokuapp.com/plate/popularAndNew?city=Centreville";

    api
      .get(url)
      .then((response) => {
        const data = response.data.data;
        console.log(response)
        // FIXME : from the server side we get the restaurant in list of recommended chef seems like a bug.
        setChefs(data["new"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Get current categories
  const indexOfLastCat = currentPage * categoryPerPage;
  const indeOfFirstPage = indexOfLastCat - categoryPerPage;
  const currentChef = chefs.slice(indeOfFirstPage, indexOfLastCat);

  const Pagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(chefs.length / categoryPerPage); i++) {
      pageNumbers.push(i);
    }

    const handlePreviousPage = () => {
      if (currentPage <= pageNumbers.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNextPage = () => {
      if (currentPage < pageNumbers.length) {
        setCurrentPage(currentPage + 1);
      }
    };

    return (
      <nav className="nav">
        <span className="textTitle">New of Cheffy</span>
        <div className="buttons">
          <Button className="button" onClick={handlePreviousPage}>
            <BsArrowLeft color="#000" size={20} />
          </Button>
          <Button className="button" onClick={handleNextPage}>
            <BsArrowRight color="#000" size={20} />
          </Button>
        </div>
      </nav>
    );
  };

  return (
    <Hidden smDown implementation="css">
      <div id="pagination-newCheffy">
        {Pagination()}
        <ul className="plateList">
          {chefs.length > 0 && currentChef.map((items: any) => (
              <li key={items.id} >
                  {items.PlateImages.map((img: any) => (
                      <img
                        key={img.id}
                        id={`id_${img.id}`}
                        src={img.url === null ? foodNotFound : img.url}
                        alt={img.name}
                      />
                    ))
                  }                 
                <div className="details">
                  <div className="label">
                    <span>{items.name}</span>
                    <span>${items.price}</span>
                  </div>
                  <div className="rating">
                    <span className="review">
                      <BsFillStarFill color="red"/>
                      <span style={{margin: "0px 5px"}}>{items.AggregateReview === null ? "No review": items.AggregateReview}</span>
                    </span>
                    <span className="delivery-time">
                      <BsFillClockFill/>
                      <span style={{margin: "0px 5px"}}>{items.delivery_time} min</span>
                    </span>
                    <span className="delivery">
                      <BsGridFill></BsGridFill>
                      <span style={{margin: "0px 5px"}}> {items.delivery_type}</span>
                    </span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Hidden>
  );
};

export default PopularPlates;
