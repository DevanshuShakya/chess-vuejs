<script setup>
import { useGameStore } from '@/stores/game.js';
import { watch, ref, onUpdated, reactive } from 'vue'

const gameStore = useGameStore();
const preContainer = ref(null); // Ref for the pre element

function toggleColor(color) {
    if (color === 'b') {
        return 'w'
    }
    else {
        return 'b'
    }

}

let history = ref(null)


watch(()=> gameStore.move, (newValue, oldValue) =>{
    preContainer.value.scrollTop = preContainer.value.scrollHeight;
    history.value = gameStore.boardAPI.getHistory(true)
    // console.log(history.value)
},
{ deep: true}
);


// let pgn;
let pgn = "1. e4 d5 2. exd5 e6 3. dxe6 fxe6 4. Qe2 Qd5 5. Qxe6+ Qxe6+ 6. Kd1 Qe1+"

function loadpgn(){
    gameStore.boardAPI.loadPgn(pgn)
    gameStore.move = "pgn loaded"
}

function getPgn(){
    pgn = gameStore.boardAPI.getPgn()
    console.log(typeof pgn)
    console.log(gameStore.boardAPI.getPgn())
}


function handleReset(){

    alert('Add a modal to confirm to leave the current game')

    // trigger a modal to ask for cofirmation 
    gameStore.move = null;
    gameStore.boardAPI.resetBoard();
}

</script>
<template>


    <!-- <div class="card text-center" style="width: 100%;background-color: #4d4d4d;border: none;">
        <div class="card-body"> -->

        
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">piece</th>
                        <th scope="col">from</th>
                        <th scope="col">to</th>
                        <th scope="col">captured</th>
                    </tr>
                </thead>

            </table>
            <pre ref="preContainer" style="background-color: #454545; height: 200px;">
                            <table class="table table-dark table-striped table-hover">        
                                <tbody>
                                    <tr v-for="(move, index) in history" :key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <!-- <td>{{ move.color }}</td> -->
                                        <td><img :src="gameStore.getPieceImage(move.piece, move.color)" :alt="move.piece" style="height: 30px;"></td>
                                        <td>{{ move.from }}</td>
                                        <td>{{ move.to }}</td>
                                        <!-- <td>{{ move.captured }}</td> -->
                                        <td v-if="move.captured"><img  :src="gameStore.getPieceImage(move.captured, toggleColor(move.color))" style="height: 30px;"></td>
                                        <td v-else> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </pre>

           

            <!-- Options -->
            <div class="container" style="background-color: #454545; padding: 10px;">
                <div class="row">
                    <div class="col-sm-3" style="height: 54px;">
                        <button @click="handleReset()" class="btn btn-dark"
                            style="height: 50px;width: 100%;border-radius: 0px;">New Game</button>
                    </div>
                    <div class="col-sm-3" style="height: 54px;">
                        <button @click="gameStore.boardAPI.undoLastMove()" class="btn btn-dark"
                            style="height: 50px;width: 100%;border-radius: 0px;">Undo</button>
                    </div>
                    <div class="col-sm-3" style="height: 54px;">
                        <button @click="getPgn()" class="btn btn-dark" style="height: 50px;width: 100%;border-radius: 0px;">Get PGN</button>
                    </div>
                    <div class="col-sm-3" style="height: 54px;">
                        <button @click="loadpgn()" class="btn btn-dark" style="height: 50px;width: 100%;border-radius: 0px;">Load PGN</button>
                    </div>

                </div>
            </div>
    


</template>

<style scoped>
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