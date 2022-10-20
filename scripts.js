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
    3) Determine how many are correct and/or in the right spot
    4) update the hints row according to the above
    5) update the other hints rows with the previous values
    */
app.submit = () => {
    let rowInd = 0;
    $('#submit').on('click', function(){
        // 1) Store the guess tray values
        if (!$(clickDot).attr('style')){
            alert('please enter your entire guess');
        } else {
            const guessArr = Array.from($(clickDot));
            const guessVal = guessArr.map((c) => {
                return $(c).attr('style').split(' ').pop();
            });
            console.log('guess: ', guessVal);
            // 2) Replace each game board row with the previous row/guess value
            const guessBoardRow = Array.from($(`.game-board_guesses ${row}`));
            const currentRow = $(guessBoardRow[rowInd]);
            const firstRow = $(guessBoardRow[0]);
            // const rowDotArr = Array.from($(currentRow).find(dot));
            const firstDotArr = Array.from($(firstRow).find(dot));
            // const prevRow = Array.from($(guessBoardRow[rowInd - 1]).find(dot));
            $(firstRow).find(dot).attr('style', function(){
                const dotInd = firstDotArr.indexOf(this);
                return `background-color: ${guessVal[dotInd]}`;
            });
            if (rowInd > 0 && rowInd < 12){
                $(guessBoardRow).each((r) => {
                    const rowDotArr = Array.from($(guessBoardRow[r]).find(dot));
                    const prevRow = guessBoardRow[r - 1];
                    const prevArr = Array.from($(prevRow).find(dot));
                    // TODO: getting close. This updates all the rows now at the same time
                    if (r !== 0 && $(prevArr[0]).attr('style')){
                        rowUpdate(guessBoardRow[r], rowDotArr, prevArr);
                    }
                });
            }
            rowInd++ ;


        }
    })
}

const rowUpdate = (row, arr, prev) => {
    console.log(row, arr, prev);
    const colorHex = prev.map((c) => {
        return $(c).attr('style').split(' ').pop();
        
    });
    $(row).find(dot).attr('style', function(){
        const dotInd = arr.indexOf(this);
        return `background-color: ${colorHex[dotInd]}`;
    });
}

$().ready(() => {
    app.modals();
    app.dots();
    app.solution();
    app.submit();
})