const createGame = async (name, userContext) => {
    try {
        await fetch("/api/chess/createGame=name=" + name, {
            headers: new Headers({
                Authorization: userContext.user.accessToken
            })
        })
    } catch (e) {
        console.error(e)
    }
}

const joinGame = async (gameId, color, userContext) => {
    try {
        await fetch("/api/chess/joinGame?gameId=" + gameId + "&color=" + color , {
            headers: new Headers({
                Authorization: userContext.user.accessToken
            })
        })
    } catch (e) {
        console.error(e)
    }
}

const leaveGame = async (gameId, userContext) => {
    try {
        await fetch("/api/chess/leaveGame?gameId=" + gameId , {
            headers: new Headers({
                Authorization: userContext.user.accessToken
            })
        })
    } catch (e) {
        console.error(e)
    }
}

const fetchActiveGame = async (userContext, chessContext) => {
    try {
        const game = await (await fetch("/api/chess/getJoinedGame", {
            headers: new Headers({
                Authorization: userContext.user.accessToken
            })
        })).json();
        chessContext.setChess({...chessContext.chess, game: game})
    } catch (e) {
        console.error(e)
    }
}

const fetchBoard = async (gameId, userContext, chessContext) => {
    try {
        const board = await (await fetch("/api/chess/getBoard?gameId=" + gameId, {
            headers: new Headers({
                Authorization: userContext.user.accessToken
            })
        })).json();
        chessContext.setChess({...chessContext.chess, board: board})
    } catch (e) {
        console.error(e)
    }
}

const fetchGames = async (userContext, chessContext) => {
    try {
        const games = await (await fetch("/api/chess/getGames", {
            headers: new Headers({
                Authorization: userContext.user.accessToken
            })
        })).json();
        chessContext.setChess({...chessContext.chess, gameList: games})
    } catch (e) {
        console.error(e)
    }
}


export {fetchGames, createGame, joinGame, leaveGame, fetchActiveGame, fetchBoard}