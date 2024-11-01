import Navbar from "./Components/Navbar";
import Weather from "./Components/Weather";

function App() {
  return (
    <>
      <Navbar />
      <div className="m-0 p-0 bg-cover bg-center min-h-screen bg-[url('https://facts.net/wp-content/uploads/2023/07/16-facts-about-sunshine-1689735178.jpg')]">
        <div className="min-h-[100vh] flex bg-[#e2d4ff] bg-opacity-60">
          <Weather />
        </div>
      </div>
    </>
  );
}

export default App;
