import { useLocation } from "preact-iso";

export function Header() {
    const { url } = useLocation();

    return (
        <header>
            <div class="flex items-center mx-8">
                <div class="w-1/3 flex flex-row items-center space-x-8">
                    <img
                        src="/public/spin.gif"
                        alt="Rat spinning horizontally"
                        style="max-width:100px"
                        class="rounded-full"
                    />
                    <button class="w-36 h-12 rounded-md hover:bg-green-900">
                        Rat mapper 🐀
                    </button>
                </div>
                <div class="ml-auto flex flex-row items-center space-x-16">
                    <button class="w-20 h-12 rounded-md hover:bg-green-900">
                        Home
                    </button>
                    <button class="w-20 h-12 rounded-md hover:bg-green-900">
                        Breed
                    </button>
                    <button class="w-28 h-12 rounded-md hover:bg-green-900">
                        Family Tree
                    </button>
                </div>
            </div>
        </header>
    );
}
