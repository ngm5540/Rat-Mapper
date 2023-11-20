import "./style.css";

export function Home() {
    return (
        <div class="home major_component">
            <h1 class="text-2xl font-bold">Create your rat</h1>
            <div class="space-y-4 ml-6">
                <div class="rat_question">
                    <label for="hair-color">Hair Color</label>
                    <select name="hair-color" class="rat_question">
                        <option value="black">Black</option>
                        <option value="white">White</option>
                        <option value="grey">Grey</option>
                    </select>
                </div>
                <div class="rat_question">
                    <label for="eye-color">Eye Color</label>
                    <select name="eye-color" class="rat_question">
                        <option value="red">Red</option>
                        <option value="black">Black</option>
                    </select>
                </div>
                <div class="rat_question">
                    <label for="ear-size">Ear Size</label>
                    <select name="ear-size" class="rat_question">
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <div class="inline-flex flex-col">
                    <div class="flex">
                        <p>5'</p>
                        <p class="ml-auto">3'</p>
                    </div>
                    <div class="flex flex-row">
                        <div class="codon">aug</div>
                        <div class="codon">tcg</div>
                        <div class="codon">cag</div>
                        <div class="codon">gat</div>
                        <div class="codon">atg</div>
                        <div class="codon">uag</div>
                    </div>
                </div>
            </div>
            <div class="mt-4 space-x-2">
                <label for="rat-name">Name your rat:</label>
                <input class="border-2 rounded-md border-black dark:border-indigo-600"></input>
                <button class="bg-indigo-500 hover:bg-indigo-700 text-white rounded-md ml-auto w-32 h-8">
                    Send to shed
                </button>
            </div>
        </div>
    );
}
