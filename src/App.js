import "./scss/main.scss";

import { MainInfo } from "./components";

function App() {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://georgeshvab.github.io/cumulus/images/background_rain_1.jpg)",
      }}
      className="wrapper"
    >
      <MainInfo />
    </div>
  );
}

export default App;
