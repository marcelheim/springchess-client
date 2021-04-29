import React, {useState} from "react";
import {Box, Button, List, ListItem, makeStyles, TextField, Toolbar, Typography} from "@material-ui/core";
import springChessDark from "../themes/springChessDark";
import {useContext} from "react";
import {ChessContext, UserContext} from "../contexts/contexts";
import {createGame, fetchActiveGame, fetchGames, joinGame, leaveGame} from "../utility/utils";
import {useInterval} from "../utility/hooks";

const useStyles = makeStyles({
    gameList: {
        '& > ul > li > *': {
            margin: springChessDark.spacing(1),
        },
        width: "100%"
    },
    gameListToolBar: {
        '& > *': {
            marginRight: springChessDark.spacing(1),
        }
    }
});

function GameList() {
    const classes = useStyles();

    const userContext = useContext(UserContext);
    const chessContext = useContext(ChessContext);

    const [gameName, setGameName] = useState("");

    return (<div className={classes.gameList}>
        <Box display="flex" justifyContent="flex-end">
            <Toolbar className={classes.gameListToolBar}>
                <TextField color="secondary" variant="outlined" label="Name" value={gameName} onChange={(event) => setGameName(event.target.value)}/>
                <Button color="secondary" variant="contained" onClick={() => createGame(gameName, userContext)}>Create Game</Button>
            </Toolbar>
        </Box>
        <List>
            { chessContext.chess.gameList.length > 0 &&
                chessContext.chess.gameList.map((game) => {
                    const userIsBlack = game.black === userContext.user.publicAddress;
                    const userIsWhite = game.white === userContext.user.publicAddress;
                    return (
                        <ListItem key={game.id}>
                            <Typography>{game.name}</Typography>
                            { !chessContext.chess.game.id &&
                                <Button disabled={!!game.white} color="secondary" variant="contained"
                                        onClick={() => {
                                            joinGame(game.id, "WHITE", userContext)
                                                .then(() => fetchGames(userContext, chessContext))
                                        }}
                                >Join White</Button>
                            }
                            { !chessContext.chess.game.id &&
                                <Button disabled={!!game.black} color="secondary" variant="contained"
                                        onClick={() => {
                                            joinGame(game.id, "BLACK", userContext)
                                                .then(() => fetchGames(userContext, chessContext))
                                        }}
                                >Join Black</Button>
                            }
                            { (userIsWhite || userIsBlack) &&
                                <Button color="secondary" variant="contained"
                                    onClick={() => {
                                        leaveGame(game.id, userContext)
                                            .then(() => fetchGames(userContext, chessContext))
                                    }}
                                >Leave</Button>
                            }
                        </ListItem>
                    );
                })
            }
        </List>
    </div>);
}

export default GameList;