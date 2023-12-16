/**
 * Page header
 *
 * @author Nathan Jankowski (njj3397 [at] rit . edu)
 **/
export function Header() {
    return (
        <header>
            <div class="flex items-center sm:px-2 md:p-4 bg-indigo-500 text-white">
                <div class="md:w-1/3 flex flex-row items-center space-x-2 md:space-x-8">
                    <img
                        src="/spin.gif"
                        alt="Rat spinning horizontally"
                        style="max-width:100px"
                        class="rounded-full hidden md:block"
                    />
                    <a class="md:text-lg">Rat Mapper</a>
                </div>
                <div class="overflow-auto ml-auto flex flex-row items-center space-x-4 w-1/3 justify-evenly">
                    <a class="hover:text-indigo-200" href="/">
                        Home
                    </a>
                    <a class="hover:text-indigo-200" href="/about">
                        About
                    </a>
                    <a class="hover:text-indigo-200" href="/breed">
                        Breed
                    </a>
                    <a class="hover:text-indigo-200" href="/tree">
                        All rats
                    </a>
                </div>
            </div>
            <div class="bg-red-600 text-white">
                <p class="py-2 pl-6">
                This is a public preview.  Rat creation and genome generation both work,
                and you can still breed and view existing rats, but submissions have
                been temporarily disabled to prevent abuse.<br/>
                Check back later to submit a rat :)
                </p>
            </div>
        </header>
    );
}
