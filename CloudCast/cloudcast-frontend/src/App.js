import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import PodcastEmbed from "./components/PodcastEmbed";

function App() {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 space-y-10">
        <MusicPlayer />
        <PodcastEmbed />
      </div> 
    </div>
  );
}

export default App;
