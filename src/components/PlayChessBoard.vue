<script setup>
import { ref, watch } from "vue";
import { TheChessboard } from 'vue3-chessboard';
import 'vue3-chessboard/style.css';
import { useOptionStore } from "@/stores/option.js"
import { useGameStore } from "@/stores/game.js";
import { onMounted, onUnmounted } from 'vue';


// Initialize the worker
let worker;
let globalSUM = 0;

onMounted(() => {
    // Load the Web Worker
    worker = new Worker(new URL('@/workers/botWorker.js', import.meta.url), { type: 'module' });


    // Listen for messages from the worker
    worker.onmessage = (e) => {
        const { type, data } = e.data;

        if (type === 'BEST_MOVE') {
            const { bestMove, globalSum } = JSON.parse(data);
            globalSUM = globalSum
            gameStore.boardAPI.move(bestMove)
        }
    };
});

// Send a message to the worker to make a move
function triggerBotMove(fen, history, globalSUM, depth) {
    worker.postMessage({
        type: 'MAKE_MOVE',
        data: JSON.stringify({ fen, history, globalSUM, depth }),
    });
}

onUnmounted(() => {
    worker.terminate();
});

const optionStore = useOptionStore()
const gameStore = useGameStore()


let lost_black = ref(null); // Reactive array to store
let lost_white = ref(null); // Reactive array to store

function toggleColor(color) {
    if (color === 'b') {
        return 'w'
    }
    else if (color === 'w') {
        return 'b'
    }
    else if (color === 'white') {
        return 'black'
    }
    else {
        return 'white'
    }
}

function getPieceStyle(index) {
    return {
        zIndex: index, // Higher index pieces appear on top
        left: `${index * 20}px`, // Adjust the offset as needed
    }
}

const boardConfig = {
    coordinates: true,
    animation: { // modify piece animations
        enabled: true,
        duration: 500,
    },
    style: {
    colors: {
      dark: '#4d4d4d',  // Dark squares color
      light: '#eeeed2', // Light squares color
    },
  },
};

const playerColor = 'white';



function handleBoardCreated(boardApi) {
    gameStore.boardAPI = boardApi;
}


watch(() => gameStore.move, (newValue, oldValue) => {
    if (gameStore.move != null) {
        lost_white.value = gameStore.boardAPI.getCapturedPieces()['black']
        lost_black.value = gameStore.boardAPI.getCapturedPieces()['white']
    }
    else {
        lost_white.value = null
        lost_black.value = null
    }

},
    { deep: true }
);

function handleMove(move_) {
    gameStore.move = move_; // Add the move to the moves array

    if (optionStore.option === 'beginner') {
        if (move_.color === 'w') {
            triggerBotMove(gameStore.boardAPI.getFen(), gameStore.boardAPI.getHistory(true), globalSUM, 1)
        }
    }
    if (optionStore.option === 'intermediate') {
        if (move_.color === 'w') {
            triggerBotMove(gameStore.boardAPI.getFen(), gameStore.boardAPI.getHistory(true), globalSUM, 2)
        }
    }
    if (optionStore.option === 'advanced') {
        if (move_.color === 'w') {
            triggerBotMove(gameStore.boardAPI.getFen(), gameStore.boardAPI.getHistory(true), globalSUM, 3)
        }
    }
    if (optionStore.option === 'expert') {
        if (move_.color === 'w') {
            triggerBotMove(gameStore.boardAPI.getFen(), gameStore.boardAPI.getHistory(true), globalSUM, 4)
        }
    }
}

function handleCheckmate(isMated) {
    // Create a Bootstrap modal instance
    const mymodal = new bootstrap.Modal('#myModal');
    gameStore.winner = toggleColor(isMated)
    // Show the modal
    mymodal.show();
}


</script>
<template>
    <div>

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" style="width: 200px;">
                <div class="modal-content bg-success">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Game Over</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img style="height: 50px; width: 50px;" :src="gameStore.getPieceImage('k', gameStore.winner[0])"
                            alt=""> won the
                        game.
                    </div>

                </div>
            </div>
        </div>

        <!-- Chessboard component -->

        <!-- Opponent Captured Pieces -->

        <div class="captured-pieces">
            <div v-for="(piece, index) in lost_white" :key="index" :class="['piece']" :style="getPieceStyle(index)">
                <img :src="gameStore.getPieceImage(piece, 'w')" style="height: 30px;" :alt="piece.type" />
            </div>
        </div>

        <!-- Opponent Label -->
        <div style="font-weight: 600; font-size: small;padding: 7px;text-align: end;padding-right: 30px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-fill"
                viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            <span v-if="!optionStore.option">
                Opponent
            </span>
            <span v-if="optionStore.option === 'beginner'">
                Nobita
            </span>
            <span v-if="optionStore.option === 'intermediate'">
                Suneo
            </span>
            <span v-if="optionStore.option === 'advanced'">
                Suzuka, the Grandmaster
            </span>
            <span v-if="optionStore.option === 'expert'">
                Degisuki, the undefeatable
            </span>
        </div>

        <!-- Chessboard -->

        <TheChessboard v-if="!optionStore.option" :board-config="boardConfig" style="max-width: 565px;"
            @move="handleMove" @checkmate="handleCheckmate" @board-created="handleBoardCreated" />

        <TheChessboard v-if="optionStore.option === 'advanced'" :board-config="boardConfig" style="max-width: 565px;"
            @move="handleMove" :player-color="playerColor" @checkmate="handleCheckmate"
            @board-created="handleBoardCreated" />

        <TheChessboard v-if="optionStore.option === 'expert'" :board-config="boardConfig" style="max-width: 565px;"
            @move="handleMove" :player-color="playerColor" @checkmate="handleCheckmate"
            @board-created="handleBoardCreated" />

        <TheChessboard v-if="optionStore.option === 'beginner'" :board-config="boardConfig" style="max-width: 565px;"
            @move="handleMove" :player-color="playerColor" @checkmate="handleCheckmate"
            @board-created="handleBoardCreated" />

        <TheChessboard v-if="optionStore.option === 'intermediate'" :board-config="boardConfig"
            style="max-width: 565px;" @move="handleMove" :player-color="playerColor" @checkmate="handleCheckmate"
            @board-created="handleBoardCreated" />

        <!-- Your Captured Pieces -->
        <div class="captured-pieces">
            <div v-for="(piece, index) in lost_black" :key="index" :class="['piece']" :style="getPieceStyle(index)">
                <img :src="gameStore.getPieceImage(piece, 'b')" style="height: 30px;" :alt="piece.type" />
            </div>
        </div>

        <!-- Your Label -->
        <div style="font-weight: 600; font-size: small;text-align: end; padding: 7px;padding-right: 30px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-fill"
                viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            You
        </div>

    </div>
</template>


<style scoped>
.captured-pieces {
    position: relative;
    width: 199px;
    /* Adjust as needed */
}

.piece {
    position: absolute;
    width: 30px;
    padding-top: 10px;
    padding-left: 20px;
    /* Adjust piece size */

}
</style>