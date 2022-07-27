/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const curatorView = () => {

    const view = [
        theCollection(true),
    ]

    if (!gameState.isCuratorReady) {
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

        view.push({
            type: `SUBMIT_BUTTON`,
            data: `Done`,
        })
    }
    
    return ({
        player: gameState.curator,
        view    
    })
}

const playerGuessView = (player) => ({
    player,
    view: [
        theCollection(),
        {
            type: "TITLE",
            data: {
                description: "Can you figure out the collection's theme?"
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
        return !gameState.ruleGuesses.find(guess => guess.player._id === player._id)
    })

    console.log(playersThatHaveNotGuessed, gameState.ruleGuesses)
    playerViews = playersThatHaveNotGuessed.map((player) => playerGuessView(player))

    gameState.ruleGuesses.forEach((guess) => {
        playerViews.push(playerWaitingView(guess.player))
    })

    playerViews.push(curatorView());
}

const onInitialisation = () => {
    gameState.ruleGuesses = [];
    gameState.isCuratorReady = false;

    renderViews();
};

const onSubmit = () => {
    if (context.playerView.player._id === gameState.curator._id) {
        if (context.component === 1) {
            gameState.selectedGuesses = context.playerView.view[1].child.data.filter(
                (card) => card.selected,
            ).map(item => item.text);
        } else {
            gameState.isCuratorReady = true;
        }
        
    } else {
        gameState.ruleGuesses.push({
            guess: context.playerView.view[1].child.data,
            player: context.playerView.player
        })
    }

    if (gameState.players.length === gameState.ruleGuesses.length && gameState.isCuratorReady) {
        gameState.collection = gameState.selectedGuesses
        gameState.selectedGuesses = [];
        
        phaseName = `reviewRule`;
    }

    renderViews();
};

const onTimeout = () => {};

const onPlayerJoined = () => {};

const onPlayerLeft = () => {};
