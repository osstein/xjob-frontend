import { useEffect, useState } from "react";

const Episodes = () => {
  // Get CSS
  require("./episodes.css");
  // States
  const [isEpisode, setEpisode] = useState([]);
  const [isActive, setActive] = useState({ filePath: "", description: "Beskrivning" });

  //Get episodes
  const getEpisode = () => {
    let fetchPath = "https://localhost:7207/api/apiepisode/";
    const fetchTasting = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();

        setEpisode(data);
        setActive(data[0]);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    };
    fetchTasting(fetchPath);
  };

  // Run once

  useEffect(() => {
    getEpisode();
  }, []);

  // State for open close
  const [isReadMore, setReadMore] = useState(false);

  return (
    <main>
      <section className={"main-section-episode"}>
        <div className="episode-half">
          <div className="player">
            <audio id={"player"} controls src={"https://localhost:7207/" + isActive.filePath}>
              <p>The audioplayer is not supported</p>
            </audio>
          </div>

          <div className="player-description">
            <h3>{isActive.title}</h3>
            <p>
              {isReadMore ? isActive.description : isActive.description.substring(0, 300) + "..."}
            </p>
            <p style={{ textAlign: "right" }} onClick={() => setReadMore(!isReadMore)}>
              <b className="bold">{isReadMore ? "Stäng" : "Läs Mer"}</b>
            </p>
          </div>
        </div>
        <div className="episode-half">
          <h2>Episode</h2>
          <ul>
            {isEpisode.map((item) => {
              return (
                <li
                  className="episode-list"
                  key={item.id}
                  onClick={() => {
                    setActive(item);
                  }}
                >
                  <b className="bold">{"S" + item.s + "E" + item.e}</b> - {item.title}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Episodes;
