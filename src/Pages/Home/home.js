import HeaderImage from "../../Assets/headerbashmoreplash.jpg";
import { useEffect, useContext, useState } from "react";
import NewsArticle from "./readmore";
import { NavLink } from "react-router-dom";
import { LightgalleryItem } from "react-lightgallery";
import NotificationContext from "../../NotificationContext";

const Home = () => {
  require("./home.css");

  const { NewNotification } = useContext(NotificationContext);

  const [isNews, setNews] = useState([]);
  const [isName, setName] = useState();
  const [isEmail, setEmail] = useState();
  const [isMessage, setMessage] = useState();

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

  const sendMail = () => {
    if (isName !== undefined && isEmail !== undefined && isMessage !== undefined) {
      let formData = JSON.stringify({
        Name: isName,
        Email: isEmail,
        Message: isMessage,
      });

      let url = `https://localhost:7207/api/APIContactform`;
      fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .then(NewNotification("TACK! " + isName + ", ditt meddelande är skickat"))
        .then(document.getElementById("checkout-form").reset())
        .catch((res) => console.log(res));
    } else {
      NewNotification("Alla fält måste vara ifyllda");
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  // To count printed news
  let q = 0;

  return (
    <main>
      <div className="header-image">
        <LightgalleryItem src={HeaderImage}>
          <img src={HeaderImage} alt="Header fish " />
        </LightgalleryItem>
      </div>
      <div className="front-display">
        <section>
          <article className="frontpage-part">
            <h2 className="main-header">BashPodden</h2>
            <p>
              <span className={"main-slogan"}>Sveriges mest intressanta podd!</span>
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
          <article className="frontpage-part">
            <h3>Kontakta BashPodden</h3>
            <p>Vill du komma i kontakt med BashPodden?</p>
            <form className="contact-form">
              <label>
                Namn:
                <br />
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                />
              </label>

              <label>
                Din E-post:
                <br />
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                />
              </label>

              <label>
                Meddelande:
                <br />
                <textarea
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </label>
              <input
                type={"button"}
                value="Skicka"
                onClick={(e) => {
                  sendMail(e);
                }}
              />
            </form>
          </article>
        </section>
        <section>
          <NavLink to="/Nyheter" className="newsHeader">
            <h2>Nyheter</h2>
          </NavLink>
          {isNews
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .filter((a) => {
              if (new Date(a.timestamp) < new Date()) {
                return a;
              } else return "";
            })
            .slice(0, 5)
            .map((news) => {
              if (q < 4) {
                q++;
                return (
                  <NewsArticle
                    key={news.id}
                    title={news.title}
                    content={news.content}
                    imagePath={news.imagePath}
                    imageAlt={news.imageAlt}
                    date={news.timestamp}
                  />
                );
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
