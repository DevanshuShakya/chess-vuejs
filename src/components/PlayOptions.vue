<script setup>
import { ref } from 'vue'
import { useOptionStore } from '@/stores/option.js'


const optionStore = useOptionStore()
const selectedOption = ref(null)

function selectOption(option) {
    selectedOption.value = option; // Set the selected main option
}
function selectSubOption(subOption) {
    console.log("Selected Sub Option:", subOption);
    optionStore.option = subOption
    // Handle sub-option logic here, e.g., start game with selected level
}
function goBack() {
    console.log("Go Back")
    selectedOption.value = null; // Reset to main options view
    optionStore.option = null; // Reset to main options view
}

</script>
<template>

    <!-- <div class="card" style="width: 100%; ;background-color: #4d4d4d;border: none; color: white;min-height: 240px;">
        <div class="card-body"> -->



    <div class="col-lg-12">
        <button v-on:click="goBack()" class="btn"
            style="border: none;border-radius: 900px; width: 30px;height: 30px;padding: 0px;">
            <img src="@/data/back.png" style="height: 15px;" alt="">
        </button>

    </div>
    <div class="container" v-if="!optionStore.option">
        <div class="row">
            <div class="col-lg-12" style="height: 200px; overflow-y:scroll;">
                <div class="play-options">
                    <!-- Main Options -->
                    <div v-if="!selectedOption">

                        <button @click="selectOption('online')">

                            <div class="row">
                                <div class="col-3" style="display: flex; justify-content: center; max-height: 80px">
                                    <img style="height: 70%;" src="@/data/play_online.png"
                                        class="img-fluid rounded-start" alt="...">

                                </div>
                                <div class="col-9" style="font-weight: 600;">
                                    Play Online
                                    <br>
                                    <p style="font-size: smaller;">Find Opponent and play now</p>

                                </div>
                            </div>

                        </button>

                        

                        <button @click="selectOption('bot')">

                            <div class="row">
                                <div class="col-3" style="display: flex; justify-content: center;max-height: 80px">
                                    <img style="height: 70%;" src="@/data/play_bots.png" class="img-fluid rounded-start"
                                        alt="...">

                                </div>
                                <div class="col-9" style="font-weight: 600;">
                                    Play Bot
                                    <br>
                                    <p style="font-size: smaller;">Challenge yourself with bots from Easy to Master</p>

                                </div>
                            </div>




                        </button>

                        <button @click="selectOption('friend')">

                            <div class="row">
                                <div class="col-3" style="display: flex; justify-content: center;max-height: 80px">
                                    <img style="height: 70%" src="@/data/play_a_friend.png"
                                        class="img-fluid rounded-start" alt="...">

                                </div>
                                <div class="col-9" style="font-weight: 600;">
                                    Play a friend
                                    <br>
                                    <p style="font-size: smaller;">Invite and play</p>

                                </div>
                            </div>




                        </button>

                    </div>

                    <!-- Options for Play Bot -->
                    <div v-if="selectedOption === 'bot'">
                        <button @click="selectSubOption('beginner')">Play Beginner Bot</button>
                        <button @click="selectSubOption('intermediate')">Play Intermediate Bot</button>
                        <button @click="selectSubOption('advanced')">Play Advanced Bot</button>
                        <button @click="selectSubOption('expert')">Play Expert Bot</button>
                        <button @click="goBack">Back</button>
                    </div>

                    <!-- Options for Play Online -->
                    <div v-if="selectedOption === 'online'">
                        <button @click="selectSubOption('ranked')">Play Ranked</button>
                        <button @click="selectSubOption('casual')">Play Casual</button>
                        <button @click="goBack">Back</button>
                    </div>

                    <!-- Options for Play a Friend -->
                    <div v-if="selectedOption === 'friend'">
                        <button @click="selectSubOption('invite')">Invite a Friend</button>
                        <button @click="selectSubOption('accept')">Accept an Invitation</button>
                        <button @click="goBack">Back</button>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div class="container" v-if="optionStore.option === 'beginner'" style="background-color: #454545;">
        <h1>Chat box</h1>
        <p>Nobita is saying hi</p>
    </div>
    <div class="container" v-if="optionStore.option === 'intermediate'" style="background-color: #454545;">
        <h1>Chat box</h1>
        <p>Gian is saying hi</p>
    </div>
    <div class="container" v-if="optionStore.option === 'advanced'" style="background-color: #454545;">
        <h1>Chat box</h1>
        <p>Suzuka is saying hi</p>
    </div>
    <div class="container" v-if="optionStore.option === 'expert'" style="background-color: #454545;">
        <h1>Chat box</h1>
        <p>Degisuki is saying hi</p>
    </div>
</template>

<style scoped>
.play-options button {
    display: block;
    margin: 5px;
    height: 95px;
    width: 100%;
    background-color: #272829;
    border: none;
    border-radius: 5px;
    color: white;
    text-align: start;
    padding: 15px;
}

pre {
    max-height: 200px;
    /* Limit height to make scrollable */
    overflow-y: auto;
    /* Add vertical scrolling */
    white-space: pre-wrap;
    /* Preserve whitespace and allow wrapping */
}

/* For Webkit-based browsers (Chrome, Safari) */
::-webkit-scrollbar {
    width: 12px;
    /* Width of the scrollbar */
}

::-webkit-scrollbar-track {
    background-color: #2c2f33;
    /* Background of the track */
}

::-webkit-scrollbar-thumb {
    background-color: #555;
    /* Color of the scrollbar handle */
    border-radius: 6px;
    /* Rounded corners for the scrollbar handle */
    border: 3px solid #2c2f33;
    /* Space around the handle */
}

::-webkit-scrollbar-thumb:hover {
    background-color: #888;
    /* Darker color on hover */
}

/* For Firefox */
* {
    scrollbar-width: thin;
    /* Makes the scrollbar thinner */
    scrollbar-color: #555 #2c2f33;
    /* scrollbar handle color #555, track color #2c2f33 */
}
</style>