import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home/index.jsx";
import { Analyze } from "./pages/Analyze/index.jsx";
import { NotFound } from "./pages/_404.jsx";
import { Test } from "./pages/Test/Test.jsx";
import "./style.css";
import { About } from "./pages/About.jsx";

export function App() {
    return (
        <LocationProvider>
            <Header />
            <main>
                <Router>
                    <Home path="/" />
                    <Analyze path="/analyze/:dna" />
                    <Route default component={NotFound} />
                    <Test path="/test" />
                    <Route component={About} path="/about" />
                </Router>
            </main>
        </LocationProvider>
    );
}

render(<App />, document.getElementById("app"));
