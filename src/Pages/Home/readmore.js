import { useState } from "react";

const NewsArticle = (props) => {
  require("./home.css");
  const [isOpen, setOpen] = useState(true);

  return (
    <article className="news-article">
      <h3>{props.title}</h3>
      <img src={"https://localhost:7207/" + props.imagePath} alt={props.imageAlt} />
      <p>{isOpen ? props.content.substring(0, 100) + "..." : props.content}</p>
      <p className="read-button" onClick={() => setOpen(!isOpen)}>
        {isOpen ? "Läs Mer" : "Stäng"}
      </p>
    </article>
  );
};

export default NewsArticle;
