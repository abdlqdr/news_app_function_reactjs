import React from "react";

const Newsitem = (props) => {
  let {title,description,imgUrl, newsUrl, author, date,source} = props
  let d = new Date(date)
  
    return (
      <div className="my-3">
        <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1',right:-45 }}>{source}</span>
          <img src={imgUrl} className="card-img-top" alt="title image" width='30px' height="200px"/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-muted">By {author? author: "Unkown"} <br/> on {d.toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-dark" target="_blank" rel="noreferrer">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default Newsitem;
