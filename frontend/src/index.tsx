import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";
import { Header } from "./components/Header";
import { Analyze } from "./pages/Analyze/Analyze";
import { NotFound } from "./pages/_404";
import { Test } from "./pages/Test/Test";
import { About } from "./pages/About/About";
import Home from "./pages/Home/Home";
import { Breed } from "./pages/Breed/Breed";
import Tree from "./pages/Tree/Tree";

export function App() {
    return (
        <LocationProvider>
            <Header />
            <main>
                <Router>
                    <Route component={Home} path="/" />
                    <Analyze path="/analyze/:dna" />
                    <Route component={Breed} path="/breed" />
                    <Route default component={NotFound} />
                    <Route component={Tree} path="/tree" />
                    <Test path="/test" />
                    <Route component={About} path="/about" />
                </Router>
            </main>
        </LocationProvider>
    );
}

render(<App />, document.getElementById("app"));
