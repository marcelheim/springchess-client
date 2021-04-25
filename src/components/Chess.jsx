import React, {useContext} from "react";
import {Button, List, ListItem, makeStyles, Typography} from "@material-ui/core";
import {ChessContext, UserContext} from "../contexts/contexts";
import Chessboard from "chessboardjsx";

import {fetchActiveGame, fetchGames, joinGame, fetchBoard, leaveGame} from "../utility/utils";
import springChessDark from "../themes/springChessDark";
import GameList from "./GameList";

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



    return (
        <div className={classes.chess}>
            <Button onClick={() => fetchGames(userContext, chessContext)}>Test</Button>
            <GameList/>
            {chessContext.chess.game.id &&
            <Chessboard position={chessContext.chess.board.position}/>}
            <Button color="secondary" variant="contained" onClick={() => fetchActiveGame(userContext, chessContext)}>Refresh Game</Button>
            <Button color="secondary" variant="contained" onClick={() => fetchBoard(chessContext.chess.game.boardId, userContext, chessContext)}>Refresh Board</Button>
            <Button color="secondary" variant="contained" onClick={() => leaveGame(chessContext.chess.game.id, userContext)}>Leave Board</Button>
        </div>
    )
}

export default Chess;