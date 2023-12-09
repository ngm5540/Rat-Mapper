import { useLocation } from "preact-iso";
import "./Header.css";

export function Header() {
    const { url } = useLocation();

    return (
        <header>
            <div class="flex items-center sm:px-2 md:p-4 bg-indigo-500 text-white">
                <div class="md:w-1/3 flex flex-row items-center space-x-2 md:space-x-8">
                    <img
                        src="/public/spin.gif"
                        alt="Rat spinning horizontally"
                        style="max-width:100px"
                        class="rounded-full hidden md:block"
                    />
                    <button class="md:w-36 nav_button md:text-lg">
                        Rat Mapper
                    </button>
                </div>
                <div class="overflow-auto ml-auto flex flex-row items-center space-x-4">
                    <button
                        class="md:w-20 nav_button"
                        onClick={() => (window.location = "/")}
                    >
                        Home
                    </button>
                    <button
                        class="md:w-24 nav_button"
                        onClick={() => (window.location = "/about")}
                    >
                        About
                    </button>
                    <button
                        class="md:w-20 nav_button"
                        onClick={() => (window.location = "/breed")}
                    >
                        Breed
                    </button>
                    <button
                        class="md:w-28 nav_button"
                        onClick={() => (window.location = "/tree")}
                    >
                        Family Tree
                    </button>
                </div>
            </div>
        </header>
    );
}
