import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles,setArticles] = useState([]);
  const [loading,setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults,setTotalResults]  = useState(0); 
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const newUpdate = async() => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines? country=${props.country} &category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("parsedData:::  ", parsedData);
    
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
      
    props.setProgress(100);

  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsDaily`;
    newUpdate();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines? country=${props.country} &category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage( page + 1);

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("parsedData:::  ", parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  // console.log('this.state.articles',{articles})
  // handlePrevClick = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.newUpdate();
  // };
  // handleNextClick = async () => {
  //   if (
  //     !(
  //       this.state.page + 1 >
  //       Math.ceil(this.state.totalResults / this.props.pageSize)
  //     )
  //   ) {
  //     
  //     this.newUpdate();
  //   }
  // };

    return (
      <>
        <h1 className="text-center" style={{ margin: "40px,0px" }}>
          NewsDaily - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3">
            <div className="row">
              {articles.map((element, i) => (
                <div className="col-md-4" key={i + element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 30) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}
News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
};

export default News;
