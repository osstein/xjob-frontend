import HeaderImage from "../../Assets/headerbashmoreplash.jpg";
import { useEffect, useState } from "react";

const Home = () => {
  require("./home.css");

  const [isNews, setNews] = useState();

  //Get productsTypes
  const getNews = () => {
    let fetchPath = "https://localhost:7207/api/apinews/";
    const fetchTasting = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();

        setNews(data);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    };
    fetchTasting(fetchPath);
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <main>
      <div className="header-image">
        <img src={HeaderImage} alt="Header fish " />
      </div>
      <section>
      {/*   {isNews.map((news) => {
          return (
            <article className="news-article">
              <h2>{news.title}</h2>
              <p>{news.content}</p>
              <img src={"https://localhost:7207/" + news.imagePath} alt={news.imageAlt} />
            </article>
          );
        })} */}
      </section>
    </main>
  );
};

export default Home;
