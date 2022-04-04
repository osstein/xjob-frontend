import { useState, useEffect } from "react";

const News = () => {
  require("./news.css");

  const [isNews, setNews] = useState([]);
  const [isActive, setActive] = useState({ title: "", content: "Välj en nyhet", imagePath: "", imageAlt: "" });
  const [isPage, setPage] = useState(0);

  //Get News
  const getNews = () => {
    let fetchPath = "https://localhost:7207/api/apinews";
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

  function changePage(e) {
    if (e === "Prev") {
      if (isPage === 0) {
        setPage(isPage);
      } else {
        setPage(isPage - 1);
      }
    }
    if (e === "Next") {
      if (
        isPage * 5 + 5 >
        isNews.filter((a) => {
          if (new Date(a.timestamp) < new Date()) {
            return a;
          } else return "";
        }).length
      ) {
        setPage(isPage);
      } else {
        setPage(isPage + 1);
      }
    }
    console.log(isPage);
  }

  return (
    <main>
      <div className="flex-div-row">
        <section className="news-reader">
          <h2>Nyheter</h2>
          <h3>{isActive.title}</h3>
          {isActive.imagePath ? (
            <img src={"https://localhost:7207/" + isActive.imagePath} alt={isActive.imageAlt} />
          ) : (
            ""
          )}
          <p>{isActive.content}</p>
        </section>

        <section className={"main-section-column"}>
          <h3>Alla nyheter</h3>
          {isNews
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .filter((a) => {
              if (new Date(a.timestamp) < new Date()) {
                return a;
              } else return "";
            })
            .slice(isPage * 5, isPage * 5 + 5)
            .map((n) => {
              return (
                <article
                  className="news-list-article"
                  onClick={() => {
                    setActive(n);
                  }}
                  key={n.id}
                >
                  <h4>{n.title}</h4>
                  <p>{n.content.substring(0, 30)}...</p>
                  <p style={{textAlign : "right"}}>{n.timestamp.substring(0, 10)}</p>
                </article>
              );
            })}
          <div className="flex-div-row-np">
            <p
              onClick={() => {
                changePage("Prev");
              }}
            >
              Föregående sida
            </p>
            <p
              onClick={() => {
                changePage("Next");
              }}
            >
              Nästa sida
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default News;
