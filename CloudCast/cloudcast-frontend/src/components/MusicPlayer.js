import { useState, useEffect } from "react";

export default function MusicPlayer() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/songs")
      .then((res) => res.json())
      .then((data) => setTracks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-12 px-6 bg-gray-50 min-h-[80vh]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">🎵 Music Collection</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracks.map((track) => (
            <div key={track.id} className="bg-white rounded-3xl shadow p-5 flex flex-col items-center">
              <iframe
                src={track.embed_url}
                width="125%"
                height="190"
                style={{ borderRadius: "12px" }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={track.title}
              ></iframe>
              <h3 className="mt-3 font-semibold">{track.title}</h3>
              <p className="text-sm text-gray-500">{track.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
