const app = {};
const colors = ["#cbff30", "#1832d8", "#f8abb3", "#bb02b5", "#fff200", "#cc2936"];
const answer = [];

app.solution = () => {
    for (let i = 0; i < 4; i++){
        answer.push(colors[Math.floor(Math.random()* 5)]);
    }
    console.log('answer: ', answer);
}
app.modals = () => {
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
        console.log(page);
        if (page !== 0 && page !== modalPane.length - 1){
            pager.attr('disabled', false);
        }
    })
}

const clickDot = '.game-guess_tray .dot';
const rowsBoard = '.dots-rows';
const guessRows = '.game-board_guesses';
const matchRows = '.game-board_hints';
const row = '.dots-row';
const dot = '.dot';
app.dots = () => {
    let ind = 0;
    for (let i = 0; i < 12; i++){
        $(rowsBoard).append(`<div class="${row.replace('.', '')}"></div>`);
    }
    for (let j = 0; j < 4; j++){
        $(row).append(`<div class="${dot.replace('.', '')}"></div>`)
    }
    $(clickDot).on('click', function(){
        if (!$(this).attr('style')){
            ind = 0;
        } else {
            ind = colors.indexOf($(this).attr('style').split(' ').pop()) + 1;
        }
        $(this).attr('style', `background-color: ${colors[ind++ % colors.length]}`);
    });
}

    /*
    On Submit:
    4) update the hints row according to the above
    5) update the other hints rows with the previous values
    */
app.submit = () => {
    let rowInd = 0;
    $('#submit').on('click', function(){
        // 1) Store the guess tray values
        if (!$(clickDot).attr('style')){
            alert('please enter your entire guess');
        } 

        const guessArr = Array.from($(clickDot));
        // 2) Replace each game board row with the guess value
        // const guessBoardRow = Array.from($(`.game-board_guesses ${row}`));
        // const currentRow = $(guessBoardRow[rowInd]);
        // const rowDotArr = Array.from($(guessBoardRow[rowInd]).find(dot));
        const colorHex = guessArr.map((c) => {
            return $(c).attr('style').split(' ').pop();
        });
        getRowInfo(guessRows, rowInd, colorHex);
        // 3) Determine how many are correct and/or in the right spot
            // Compare the solution value to the current guess value
            // If the value exists anywhere in the array, mark one as correct but out of place
            // If the value exists in the array AND at the same index mark as correct and in the right place
            const matchArr = [];
            answer.map((a, i) => {
                if (a === colorHex[i]){
                    matchArr.push('green');
                }
            });
            for (let i = 0; i < answer.length; i++){
                for (let j = 0; j < colorHex.length; j++){
                    if (answer[i] === colorHex[j] && matchArr.length < 4 ){
                        if (answer.indexOf(colorHex[j]) !== colorHex.indexOf(answer[i])){
                            matchArr.push('orange');
                        }
                    }
                }
            }
            const matchHex = [];
            matchArr.forEach((m) => {
                if (m === 'green'){
                    matchHex.push('#00FF00');
                } else {
                    matchHex.push('#FFA500');
                }
                console.log(matchHex)
                getRowInfo(matchRows, rowInd, matchHex);
            })

            rowInd++ ;
            /*
                TODO: Replace this with the win/lose modal
            */ 
            if (rowInd > 12){
                alert('game over!');
            }
    })
}

const getRowInfo = (selector, index, colors) => {
    const boardRow = Array.from($(`${selector} ${row}`));
    const currentRow = $(boardRow[index]);
    const rowDotArr = Array.from($(currentRow).find(dot));
    return rowUpdate(currentRow, rowDotArr, colors);
}

const rowUpdate = (row, arr, guess) => {
    $(row).find(dot).attr('style', function(){
        const dotInd = arr.indexOf(this);
        return `background-color: ${guess[dotInd]}`;
    });
}

$().ready(() => {
    app.modals();
    app.dots();
    app.solution();
    app.submit();
})