import React, { useState } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Material UI
import Hidden from "@material-ui/core/Hidden";

// Images
import userNotFound from "../../images/user.png";

// Icons
import { BsArrowLeft, BsArrowRight, BsFillStarFill } from "react-icons/bs";

import "./styles.scss";

interface Props {
  chefs: any;
  title: string;
}

const ChefList: React.FC<Props> = ({ chefs, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [chefPerPage, setChefPerPage] = useState(6);

  // Get current categories
  const indexOfLastCat = currentPage * chefPerPage;
  const indeOfFirstPage = indexOfLastCat - chefPerPage;
  const currentChef = chefs.slice(indeOfFirstPage, indexOfLastCat);

  const Pagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(chefs.length / chefPerPage); i++) {
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
        <span className="textTitle">{title}</span>
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
      <div id="pagination-chef">
        {Pagination()}
        <ul className="chefList">
          {chefs.length > 0 &&
            currentChef.map((chef: any) => (
              <li key={chef.id}>
                <div className="item">
                  <Image
                    id={`id_${chef.id}`}
                    src={
                      chef.imagePath === null ? userNotFound : chef.imagePath
                    }
                    alt={chef.name}
                    roundedCircle
                  />
                  <div className="title-text">
                    <span className="text">{chef.name}</span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Hidden>
  );
};

export default ChefList;
