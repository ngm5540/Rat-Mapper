import { useLocation } from "preact-iso";
import "./Header.css";

export function Header() {
    const { url } = useLocation();

    return (
        <header>
            <div class="flex items-center p-4 bg-indigo-500 text-white">
                <div class="w-1/3 flex flex-row items-center space-x-8">
                    <img
                        src="/public/spin.gif"
                        alt="Rat spinning horizontally"
                        style="max-width:100px"
                        class="rounded-full"
                    />
                    <button class="w-36 nav_button text-lg">Rat Mapper</button>
                </div>
                <div class="ml-auto flex flex-row items-center space-x-8">
                    <button class="w-20 nav_button">Home</button>
                    <button class="w-20 nav_button">Breed</button>
                    <button class="w-28 nav_button">Family Tree</button>
                </div>
            </div>
        </header>
    );
}
