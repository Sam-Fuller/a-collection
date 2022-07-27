/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const curatorView = () => {
    const view = [
        theCollection(true),
    ]

    if (!gameState.curatorSubmitted) {
        view.push({
                type: "TITLE",
                data: {
                    description: "Add an item to your collection (leave empty to skip)"
                },
                child: {
                    type: `TEXT_BOX`
                },
            },
            {
                type: `SUBMIT_BUTTON`,
                data: `Add`,
            }
        )

    } else {
        view.push({
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
        })
    }
    
    return {
        player: gameState.curator,
        view
    }
}

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

    gameState.playersThatHaveGuessed.forEach((player) => {
        playerViews.push(playerWaitingView(player))
    })

    playerViews.push(curatorView());
}

const onInitialisation = () => {
    gameState.guesses = [];
    gameState.selectedGuesses = [];
    gameState.playersThatHaveGuessed = [];

    gameState.curatorSubmitted = false;

    renderViews();
};

const onSubmit = () => {
    if (context.playerView.player._id === gameState.curator._id) {
        if (gameState.curatorSubmitted) {
            gameState.selectedGuesses = context.playerView.view[1].child.data.filter(
                (card) => card.selected,
            ).map(item => item.text);

        } else {
            const item = context.playerView.view[1].child.data
            if (item) gameState.collection.push(item)
            gameState.curatorSubmitted = true
        }
    } else {
        gameState.guesses.push(context.playerView.view[1].child.data)
        gameState.playersThatHaveGuessed.push(context.playerView.player)

        if (gameState.players.length === gameState.playersThatHaveGuessed.length) {
            phaseName = `reviewItems`;
        }
    }

    renderViews();
};

const onTimeout = () => {};

const onPlayerJoined = () => {};

const onPlayerLeft = () => {};
