import React from "react";
import {Button, List, ListItem, makeStyles, Typography} from "@material-ui/core";
import springChessDark from "../themes/springChessDark";
import {useContext} from "react";
import {ChessContext, UserContext} from "../contexts/contexts";
import {fetchActiveGame, joinGame} from "../utility/utils";

const useStyles = makeStyles({
    gameList: {
        '& > ul > li > *': {
            margin: springChessDark.spacing(1),
        },
    },
});

function GameList() {
    const classes = useStyles();

    const userContext = useContext(UserContext);
    const chessContext = useContext(ChessContext);

    return (<div className={classes.gameList}>
        <List>
            {
                chessContext.chess.gameList.map((game) => (
                    <ListItem>
                        <Typography>{game.name}</Typography>
                        <Button color="secondary" variant="contained" onClick={() => {
                            joinGame(game.id, "WHITE", userContext)
                                .then(() => fetchActiveGame(userContext, chessContext))
                        }}>Join White</Button>
                        <Button color="secondary" variant="contained" onClick={() => {
                            joinGame(game.id, "BLACK", userContext)
                                .then(() => fetchActiveGame(userContext, chessContext))
                        }}>Join Black</Button>
                    </ListItem>
                ))
            }
        </List>
    </div>);
}

export default GameList;