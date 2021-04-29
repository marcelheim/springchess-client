import React, {useContext, useEffect, useState} from "react";
import {Box, Button, List, ListItem, makeStyles, Typography} from "@material-ui/core";
import {ChessContext, UserContext} from "../contexts/contexts";
import Chessboard from "chessboardjsx";

import {fetchActiveGame, fetchGames, joinGame, fetchBoard, leaveGame} from "../utility/utils";
import springChessDark from "../themes/springChessDark";
import GameList from "./GameList";
import {useInterval} from "../utility/hooks";
import Game from "./Game";
import ReactInterval from "react-interval";

const useStyles = makeStyles({
    chess: {
        '& > *': {
            margin: springChessDark.spacing(1),
        },
    },
});

function Chess() {
    const classes = useStyles();

    const userContext = useContext(UserContext);
    const chessContext = useContext(ChessContext);

    /*useInterval(async () => {
        if(chessContext.chess.game.id) await fetchBoard(chessContext.chess.game.id, userContext, chessContext)
        await fetchActiveGame(userContext, chessContext)
        await fetchGames(userContext, chessContext)
    }, 500)

    /*useEffect( () => {
        fetchActiveGame(userContext, chessContext)
    }, [chessContext.chess.gameList])*/

    /*useEffect(() => {
        fetchGames(userContext, chessContext)
    }, [chessContext.chess.board.boardId])



    useEffect( () => {
        if(chessContext.chess.game.id) fetchBoard(chessContext.chess.game.id, userContext, chessContext)
    }, [chessContext.chess.game.id])*/

    return (
        <Box className={classes.chess} display="flex">
            <ReactInterval timeout={500} enabled={userContext.user.loggedIn} callback={async () => {
                try {
                    const gameList = await fetchGames(userContext);
                    const game = await fetchActiveGame(userContext);
                    let board = undefined;
                    let player = undefined;
                    if (game && userContext.user.loggedIn) {
                        if (game.black === userContext.user.publicAddress) player = "BLACK";
                        else if (game.white === userContext.user.publicAddress) player = "WHITE";
                    }
                    if (chessContext.chess.game.id) board = await fetchBoard(chessContext.chess.game.id, userContext);
                    chessContext.setChess({
                        ...chessContext.chess,
                        game: game,
                        gameList: gameList,
                        board: board,
                        player: player
                    })
                } catch (e) {
                    console.log(e)
                }
            }}/>
            <Game/>
            <GameList/>
        </Box>
    )
}

export default Chess;