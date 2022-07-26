/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const curatorView = () => ({
    player: gameState.curator,
    view: [
        theCollection(),
        {
            type: "TITLE",
            data: {
                description: "Choose all items that match your theme",
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
    ]
})

const playerGuessView = (player) => ({
    player,
    view: [
        theCollection(),
        {
            type: "TITLE",
            data: {
                description: "Propose an item to be added to the collection"
            },
            child: {
                type: `TEXT_BOX`,
                data: ""
            },
        },
        {
            type: `SUBMIT_BUTTON`,
            data: `Guess`,
        },
    ]
})

const playerWaitingView = (player) => ({
    player,
    view: [
        theCollection(),
    ]
})

const renderViews = () => {
    const playersThatHaveNotGuessed = gameState.players.filter(player => {
        return !gameState.playersThatHaveGuessed.find(guessed => guessed._id === player._id)
    })

    playerViews = playersThatHaveNotGuessed.map((player) => playerGuessView(player))
    console.log({playersThatHaveGuessed: gameState.playersThatHaveGuessed, playersThatHaveNotGuessed})

    gameState.playersThatHaveGuessed.forEach((player) => {
        playerViews.push(playerWaitingView(player))
    })

    playerViews.push(curatorView());
}

const onInitialisation = () => {
    gameState.guesses = [];
    gameState.selectedGuesses = [];
    gameState.playersThatHaveGuessed = [];

    renderViews();
};

const onSubmit = () => {
    if (context.playerView.player._id === gameState.curator._id) {
        gameState.selectedGuesses = context.playerView.view[1].child.data.filter(
            (card) => card.selected,
        );

    } else {
        gameState.guesses.push(context.playerView.view[1].child.data)
        gameState.playersThatHaveGuessed.push(context.playerView.player)

        if (gameState.players.length === gamestate.playersThatHaveGuessed.length) {
            phaseName = `reviewItems`;
        }
    }

    renderViews();
};

const onTimeout = () => {};

const onPlayerJoined = () => {};

const onPlayerLeft = () => {};
