import { useState } from "react";

const NewsArticle = (props) => {
  // Get CSS
  require("./home.css");
  // State for open and close
  const [isOpen, setOpen] = useState(true);

  return (
    <article className="news-article">
      <h3>{props.title}</h3>
      <p>
        <b>{props.date.substring(0, 10)}</b>
      </p>
      <img src={"https://localhost:7207/" + props.imagePath} alt={props.imageAlt} />
      <p>
        {isOpen && props.content.length > 100
          ? props.content.substring(0, 100) + "..."
          : props.content}
      </p>

      {props.content.length > 100 ? (
        <p className="read-button" onClick={() => setOpen(!isOpen)}>
          {" "}
          {isOpen ? "Läs Mer" : "Stäng"}
        </p>
      ) : (
        ""
      )}
    </article>
  );
};

export default NewsArticle;
