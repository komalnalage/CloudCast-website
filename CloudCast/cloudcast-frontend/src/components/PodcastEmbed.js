import { useState, useEffect } from "react";

const API_BASE_URL = "http://3.108.44.191:5000/api";

export default function PodcastEmbed() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/podcasts`)
      .then((res) => res.json())
      .then((data) => setPodcasts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-12 px-6 bg-gray-100 border-t border-gray-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">🎙️ Featured Podcasts</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {podcasts.map((pod) => (
            <div key={pod.id} className="bg-white rounded-3xl shadow p-5 flex flex-col items-center">
              <iframe
                src={pod.embed_url}
                width="125%"
                height="190"
                style={{ borderRadius: "12px" }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={pod.title}
              ></iframe>
              <h3 className="mt-3 font-semibold">{pod.title}</h3>
              <p className="text-sm text-gray-500">Host: {pod.host}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
