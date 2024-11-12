<script setup>
import { TheChessboard } from 'vue3-chessboard';
import { Engine } from '@/Engine/Engine.ts';

let boardAPI;
let engine;

function handleBoardCreated(boardApi) {
  boardAPI = boardApi;

  engine = new Engine(boardApi);
}

function handleMove() {
  const history = boardAPI?.getHistory(true);

  const moves_ = history?.map((move) => {
    if (typeof move === 'object') {
      return move.lan;
    } else {
      return move;
    }
  });

  if (moves_) {
    console.log(moves_)
    engine?.sendPosition(moves_.join(' '));
  }
}
</script>

<template>
  <TheChessboard
    @board-created="handleBoardCreated"
    @move="handleMove"
    :player-color="'white'"
  />
</template>