import React, { useEffect, useState } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";

// Components
import PlateNotExist from "../../layout/PlateNotExist";
import Loading from "../../layout/Loading";

//Icons
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

// Images
import foodNotFound from "../../images/foodNotFound.jpg";

import "./styles.scss";

import api from "../../services/api";

interface Props {
  setCategoryFiltered: any;
  setId: any;
  valuePage: number;
}

const PaginationCategory: React.FC<Props> = ({
  setCategoryFiltered,
  setId,
  valuePage,
}) => {
  const [categories, setCategories] = useState<Array<any>>([]);
  const [idCategory, setIdCategory] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPerPage, setCategoryPerPage] = useState(6);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    -5.03284353,
    -42.8176576,
  ]);

  /*   useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []); */

  // Chamada a api
  useEffect(() => {
    const url = "https://mycheffy.herokuapp.com/category";

    api
      .get(url)
      .then((response) => {
        const data = response.data.data;
        //console.log(data);

        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Chamada a api
  useEffect(() => {
    const url = `https://mycheffy.herokuapp.com/plate/category/${idCategory}/?page=${valuePage}&pageSize=${12}&near=${true}&lat=${
      initialPosition[0]
    }&lon=${initialPosition[1]}&radius=${321869}`;
    api
      .get(url)
      .then((response) => {
        const data = response.data.data;
        //console.log(data);

        setCategoryFiltered(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idCategory, valuePage]);

  // Get current categories
  const indexOfLastCat = currentPage * categoryPerPage;
  const indeOfFirstPage = indexOfLastCat - categoryPerPage;
  const currentCategory = categories.slice(indeOfFirstPage, indexOfLastCat);

  const Pagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(categories.length / categoryPerPage); i++) {
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
      <>
        <nav className="nav">
          <p className="textTitle">Food categories</p>
          <div className="buttons">
            <Button className="button" onClick={handlePreviousPage}>
              <BsArrowLeft color="#000" size={20} />
            </Button>
            <Button className="button" onClick={handleNextPage}>
              <BsArrowRight color="#000" size={20} />
            </Button>
          </div>
        </nav>
      </>
    );
  };

  return (
    <div id="pagination-category">
      {Pagination()}
      <ul className="categoryList">
        {categories.length > 0 &&
          currentCategory.map((category: any) => (
            <li
              key={category.id}
              onClick={() => {
                setIdCategory(category.id);
                setId(category.id);
              }}
            >
              <img
                src={category.url === null ? foodNotFound : category.url}
                alt={category.name}
              />
              <p className="text">{category.name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PaginationCategory;
