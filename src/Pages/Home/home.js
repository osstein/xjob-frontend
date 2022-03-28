import HeaderImage from "../../Assets/headerbashmoreplash.jpg";
import { useEffect, useState } from "react";
import NewsArticle from "./readmore";

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


  // To count printed news
  let q = 0;

  return (
    <main>
      <div className="header-image">
        <img src={HeaderImage} alt="Header fish " />
      </div>
      <div className="front-display">
        <section>
          <article className="frontpage-part">
            <h2 className="main-header">BashPodden</h2>
            <p>
              <span className={"main-slogan"}>Podden som löser problemen!</span>
            </p>
          </article>
          <article className="frontpage-part">
            <h3>Bashpodden återlanserar 2022</h3>
            <p>
              Hösten 2022 återlanserar BashPodden med en ny säsong! Med samhällets utveckling har
              det aldrig varit mer aktuellt att basha ner på omvärlden!
            </p>
          </article>
          <article className="frontpage-part">
            <h3>Vad vi gör</h3>
            <p>
              BASH lyfter meningsskiljaktigheter och dilemman där tanken är god men man inte nått
              hela vägen fram. Genom att diskutera och analysera olika ämnen, lyfter podden upp
              samhällets aktuella trender, moderna rön och tankevurpor för att ge lyssnarna nya
              perspektiv. Ifrågasättande är en stor del i källkritiken, ett verktyg som allt mer
              framstår som bortglömt i dagens nonchalanta samhälle! Nu släpps ifrågasättandet in i
              värmen igen med den enkla frågan; Hur tänkte dom nu?
            </p>
            <br></br>
            <p>
              Podden släpps säsongsvis, där varje säsong innehåller 10 avsnitt. Avsnitten är
              fristående och kan lyssnas på som serie eller enskilda avsnitt. Samtliga avsnitt
              släpps på plattformar där poddar finns men även på Youtube. Innehållet är samma på
              samtliga plattformar, dock kommer en hel del extra material att släppas även på
              Youtube.
            </p>
          </article>
        </section>
        <section>
          <h2 className="newsHeader">Nyheter</h2>
          {isNews
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((news) => {
              if (new Date(news.timestamp) < new Date()) {
                
                if (q < 5) {
                  q++;
                  return (
                    <NewsArticle
                      title={news.title}
                      content={news.content}
                      imagePath={news.imagePath}
                      imageAlt={news.imageAlt}
                    />
                  );
                } else {
                  return "";
                }
              } else {
                return "";
              }
            })}
        </section>
      </div>
    </main>
  );
};

export default Home;
