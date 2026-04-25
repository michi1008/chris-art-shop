import React, { useState } from "react";
import "./HomeScreen.css";
import Paginate from "../components/Paginate";
import { useParams, Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Filter from "../components/Filter";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [filters, setFilters] = useState({
    category: "",
    style: "",
    sortBy: "",
  });

  const { category, style, sortBy } = filters;

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    category,
    style,
    sortBy,
  });

  const handleFilterChange = (newFilters) => {
    setFilters({
      ...filters,
      ...newFilters,
    });
  };

  return (
    <div className="home">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="error">{error?.data?.message || error.error}</div>
      ) : (
        <div className="home-content">
          <div className="home-filter">
            <Filter onChange={handleFilterChange} />
          </div>
          <div className="gallery">
            <div className="title-container">
              <h1 className="gallery-title">Art Gallery</h1>
              <div className="underline"></div>
            </div>

            <div className={`art ${keyword ? "keyword-active" : ""}`}>
              {keyword && (
                <Link to="/">
                  <button className="home-backbtn">Go Back</button>
                </Link>
              )}

              {/* Check if products exist */}
              {data.products.length === 0 ? (
                <h2>No matched result...😢</h2>
              ) : (
                data.products.map((product) => (
                  <Product key={product._id} product={product} />
                ))
              )}
            </div>
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ""}
              sortBy={sortBy ? sortBy : ""}
              category={category ? category : ""}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
