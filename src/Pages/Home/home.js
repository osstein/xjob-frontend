import HeaderImage from "../../Assets/headerbashmoreplash.jpg";
import { useEffect, useState } from "react";

const Home = () => {
  require("./home.css");

  const [isNews, setNews] = useState([]);

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
      <div className="front-display">
        <section>
          <h2>BashPodden</h2>
          
        </section>
        <section>
          <h2>Nyheter</h2>
          {isNews.map((news) => {
            return (
              <article className="news-article">
                <h3>{news.title}</h3>
                <p>{news.content.substring(0, 100)}</p>
                <img src={"https://localhost:7207/" + news.imagePath} alt={news.imageAlt} />
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default Home;
