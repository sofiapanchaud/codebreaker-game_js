const colors = ["#cbff30", "#1832d8", "#f8abb3", "#bb02b5", "#fff200", "#cc2936"];
const answer = [];

// Randomly select four colors for the game's answer
const solution = () => {
    for (let i = 0; i < 4; i++){
        answer.push(colors[Math.floor(Math.random()* 5)]);
    }
    // console.log('answer: ', answer);
}
// Variables related to the game board circles
const rowsBoard = '.dots-rows';
const row = '.dots-row';
const dot = '.dot';
const clickDot = '.game-guess_tray .dot';

// Build the game board
const guessRows = () => {
    // Append number of rows based on game difficulty
        // TODO: Replace 12 with easy-hard based on what was picked
        for (let i = 0; i < 12; i++){
            $(rowsBoard).append(`<div class="${row.replace('.', '')}"></div>`);
        }
        // Add four game board circles per each row
        for (let j = 0; j < 4; j++){
            $(row).append(`<div class="${dot.replace('.', '')}"></div>`)
        }
        // Cycle through the available colors when the guess tray circles are clicked
        let ind = 0;
        
        $(clickDot).on('click', function(){
            if (!$(this).attr('style')){
                ind = 0;
            } else {
                ind = colors.indexOf($(this).attr('style').split(' ').pop()) + 1;
            }
            $(this).attr('style', `background-color: ${colors[ind++ % colors.length]}`);
        });
}

// Fill in the rows based on the previous guess
const getRowInfo = (selector, index, colors) => {
    const boardRow = Array.from($(`${selector} ${row}`));
    const currentRow = $(boardRow[index]);
    const rowDotArr = Array.from($(currentRow).find(dot));

    // Update the colors of the current row
    const rowUpdate = (row, arr, guess) => {
        $(row).find(dot).attr('style', function(){
            const dotInd = arr.indexOf(this);
            return `background-color: ${guess[dotInd]}`;
        });
    }

    return rowUpdate(currentRow, rowDotArr, colors);
}

// When player clicks submit, update the rows to show the most recent guess and how many elements are correct
const onSubmit = () => {
    let rowInd = 0;
    const guessRows = '.game-board_guesses';
    const matchRows = '.game-board_hints';
    $('#submit').on('click', function(){
        let answerArr = [...answer];
        // If player has not completed their guess, alert them
        if (!$(clickDot).attr('style')){
            alert('please enter your entire guess');
        } 
        // Store the guess tray values
        const guessArr = Array.from($(clickDot));
        // Get the guess hex values 
        const guessColorVal = guessArr.map((c) => {
            return $(c).attr('style').split(' ').pop();
        });
        // Update the latest row with the submitted guess values
        getRowInfo(guessRows, rowInd, guessColorVal);
        /*
            Check each guess color
            . If the color matches AND it's in the correct position, add a green dot to the hints row
            . If the color matches BUT it's in the wrong position, add an orange dot to the hints row
            . If the value is not present, add nothing
        */ 
        const matchArr = [];
        for (let i = 0; i < answerArr.length; i++){
            if (guessColorVal[i] === answerArr[i]){
                matchArr.push('green');
                guessColorVal[i] = 'x';
                answerArr[i] = 'y';
            }
        }
        for (let j = 0; j < answerArr.length; j++){
            if (answerArr.includes(guessColorVal[j])){
                matchArr.push('orange');
                let ind = answerArr.indexOf(guessColorVal[j]);
                answerArr[ind] = 'z';
                guessColorVal[j] = 'x';
            }
        }
        matchArr.forEach((m, i) => {
            if (m === 'green'){
                matchArr[i] = '#00FF00';
            } else {
                matchArr[i] = '#FFA500';
            }
        });
        getRowInfo(matchRows, rowInd, matchArr);


        rowInd++ ;
        /*
            TODO: Replace this with the win/lose modal
        */ 
        if (rowInd > 12){
            alert('game over!');
        }
    })
}

const modals = () => {
    const modal = $('.modal');
    const modalBtn = $('.modal-close');
    const openModal = $('.modal-open');
    const modalPane = $('.modal-inner_pane');
    const pager = $('.modal-btn');
    let page = 0; 
    modalBtn.on('click', function(){
        modal.removeClass('is-open');
    });
    openModal.on('click', function(e){
        e.preventDefault();
        const matchId = $(this).attr('id');
        $(`.${matchId}`).addClass('is-open');
    });
    pager.on('click', function(){
        if ($(this).hasClass('next')){
            $(modalPane[page]).addClass('hidden');
            page = page + 1;
            $(modalPane[page]).removeClass('hidden');
            if (page === modalPane.length - 1){
                $(this).attr('disabled', true);
            } 
            
        } else  {
            $(modalPane[page]).addClass('hidden');
            page = page - 1;
            $(modalPane[page]).removeClass('hidden');
            if (page === 0) {
                $(this).attr('disabled', true);
            }
        }
        if (page !== 0 && page !== modalPane.length - 1){
            pager.attr('disabled', false);
        }
    });
    // if ($('.new-game_modal').hasClass('is-open')){
    //     console.log('is open');
    //     modalButtons('.new-game_modal')
    // }
}

// New game buttons
    $('.reset').on('click', () => {
        location.reload();
    });
    $('#no').on('click', () => {
        console.log('click!')
        $('.modal').removeClass('is-open');
    });

const gameOutcome = (win) => {
    if (!win){
        $('.game-end_lose').removeClass('hidden')
    }
}

$().ready(() => {
    solution();
    guessRows();
    onSubmit();
    modals();
})