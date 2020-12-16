import React, { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Array<any>>([]);
  const [idCategory, setIdCategory] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPerPage, setCategoryPerPage] = useState(6);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    -5.03284353,
    -42.8176576,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  // Chamada a api
  useEffect(() => {
    //const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
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
    //const proxyurl = "https://afternoon-brook-18118.herokuapp.com/";
    const url = `https://mycheffy.herokuapp.com/plate/category/${idCategory}/?page=${valuePage}&pageSize=${12}`;
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

  const indexOfLastCat = currentPage * categoryPerPage;
  const indeOfFirstPage = indexOfLastCat - categoryPerPage;
  const currentCategory = categories.slice(indeOfFirstPage, indexOfLastCat);

  const Pagination = () => {
    const pageNumbers = [];

    for (let i = 1; i < Math.ceil(categoryPerPage / categories.length); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul id="pagination">
          {pageNumbers.map((number: number) => (
            <li key={number} className="page-item">
              {number}
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <div id="pagination-category">
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
