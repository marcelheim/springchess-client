import React from "react";

const Web3Context = React.createContext({
    web3: undefined,
    setWeb3: () => {}
});

const UserContext = React.createContext({
    user: {
        publicAddress: undefined,
        userName: undefined,
        accessToken: undefined,
        loggedIn: false
    },
    setUser: () => {}
})

const ChessContext = React.createContext({
    chess: {
        game: {
            id: undefined,
            boardId: undefined,
            name: undefined,
            white: undefined,
            black: undefined,
            gameStatus: undefined
        },
        board: {
            position: undefined,
            halfMoveCounter: undefined,
            boardId: undefined
        },
        player: undefined,
        gameList: []
    },
    setChess: () => {}
})

export {Web3Context, UserContext, ChessContext}
