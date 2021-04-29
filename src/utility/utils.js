const createGame = async (name, userContext) => {
    try {
        await fetch("/api/chess/createGame?name=" + name, {
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

const move = async (gameId, move, userContext) => {
    try {
        await (await fetch("/api/chess/move?gameId=" + gameId + "&move=" +  move, {
            headers: new Headers({
                Authorization: userContext.user.accessToken
            })
        }));
    } catch (e) {
        console.error(e)
    }
}

const fetchActiveGame = async (userContext) => {
    try {
        return await (await fetch("/api/chess/getJoinedGame", {
            headers: new Headers({
                Authorization: userContext.user.accessToken
            })
        })).json();
    } catch (e) {
        console.error(e)
    }
}

const fetchBoard = async (gameId, userContext) => {
    try {
        return await (await fetch("/api/chess/getBoard?gameId=" + gameId, {
            headers: new Headers({
                Authorization: userContext.user.accessToken
            })
        })).json();
    } catch (e) {
        console.error(e)
    }
}

const fetchGames = async (userContext) => {
    try {
        return await (await fetch("/api/chess/getGames", {
            headers: new Headers({
                Authorization: userContext.user.accessToken
            })
        })).json();
    } catch (e) {
        console.error(e)
    }
}


export {fetchGames, createGame, joinGame, leaveGame, fetchActiveGame, fetchBoard, move}