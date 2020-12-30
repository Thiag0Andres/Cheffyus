import React, { useEffect, useState } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Material UI
import Hidden from "@material-ui/core/Hidden";

//Icons
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

// Images
import foodNotFound from "../../images/foodNotFound.jpg";

import "./styles.scss";

import api from "../../services/api";

interface Props {
  setCategoryFiltered: any;
  setCategoryBoolean: any;
  setFilterBoolean: any;
  setId: any;
  valuePage: number;
  showFilter: boolean;
  categoryBoolean: boolean;
  locationUser: any;
}

const PaginationCategory: React.FC<Props> = ({
  setCategoryFiltered,
  setCategoryBoolean,
  setFilterBoolean,
  setId,
  valuePage,
  showFilter,
  categoryBoolean,
  locationUser,
}) => {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState<Array<any>>([]);
  const [idCategory, setIdCategory] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryPerPage, setCategoryPerPage] = useState(6);

  useEffect(() => {
    setCategoryBoolean(show);
  }, [show]);

  useEffect(() => {
    setShow(categoryBoolean);
  }, [categoryBoolean]);

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
      locationUser[0]
    }&lon=${locationUser[1]}&radius=${100}`;
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
      <nav className="nav">
        <span className="textTitle">Food categories</span>
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
    <Container>
      {/*       <Row>
        <Hidden mdUp implementation="css">
          <Button
            className="button2"
            onClick={() => {
              setShow(true);
              setFilterBoolean(false);
              console.log(show);
              console.log(showFilter);
            }}
          >
            Food categories
          </Button>
        </Hidden>
      </Row> */}

      {show && !showFilter && (
        <Hidden mdUp implementation="css">
          <Row id="pagination-category">
            <Col xl="auto" lg="auto" md="auto" xs="auto" sm="auto">
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
                      <div className="item">
                        <Image
                          id={`id_${category.id}`}
                          src={
                            category.url === null ? foodNotFound : category.url
                          }
                          alt={category.name}
                          roundedCircle
                        />
                        <div className="title-text">
                          <span className="text">{category.name}</span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </Col>
          </Row>
        </Hidden>
      )}

      <Hidden smDown implementation="css">
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
                  <div className="item">
                    <Image
                      id={`id_${category.id}`}
                      src={category.url === null ? foodNotFound : category.url}
                      alt={category.name}
                      roundedCircle
                    />
                    <div className="title-text">
                      <span className="text">{category.name}</span>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </Hidden>
    </Container>
  );
};

export default PaginationCategory;
