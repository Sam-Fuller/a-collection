/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const curatorView = () => {

    const view = [
        theCollection(),
    ]

    if (!gameState.isCuratorReady) {
        view.push(
            {
                type: "TITLE",
                data: {
                    description: "Are any of these your rule?",
                },
                child: {
                    type: `CARD_LIST`,
                    data: gameState.guesses.map((guess) => {
                        const isSelected =  gameState.selectedGuesses.includes(guess);
    
                        return {
                            text: guess,
                            selected: isSelected,
                        };
                    }),
                    settings: {
                        maxSelectable: gameState.guesses.length,
                    },
                },
            },
            view.push({
                type: `SUBMIT_BUTTON`,
                data: `Done`,
            })
        )
    }
    
    return ({
        player: gameState.curator,
        view    
    })
}

const playerWaitingView = (player) => ({
    player,
    view: [
        theCollection(),
    ]
})

const renderViews = () => {
    playerViews = gameState.players.map((player) => playerWaitingView(player))

    playerViews.push(curatorView());
}

const onInitialisation = () => {
    renderViews();
};

const onSubmit = () => {
    if (context.playerView.player._id === gameState.curator._id) {
        if (context.component === 1) {
            gameState.winner = context.playerView.view[1].child.data.find(
                (card) => card.selected,
            ).player;

            gameState = "announceWinner"
        } else {
            gameState = "submitItems"
        }
    }
};

const onTimeout = () => {};

const onPlayerJoined = () => {};

const onPlayerLeft = () => {};
