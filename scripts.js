const app = {};
const colors = ["#cbff30", "#1832d8", "#f8abb3", "#bb02b5", "#fff200", "#cc2936"];
const answer = [];

app.solution = () => {
    for (let i = 0; i < 4; i++){
        answer.push(colors[Math.floor(Math.random()* 5)]);
    }
    console.log(answer);
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

app.dots = () => {
    const rowsBoard = '.dots-rows';
    const row = '.dots-row';
    const dot = '.dot';
    const clickDot = '.game-guess_tray .dot';
    const submit = '#submit'
    let ind = 0;
    for (let i = 0; i < 12; i++){
        $(rowsBoard).append(`<div class="${row.replace('.', '')}"></div>`);
    }
    for (let j = 0; j < 4; j++){
        $(row).append(`<div class="${dot.replace('.', '')}"></div>`)
    }
    $(clickDot).on('click', function(){
        $(this).attr('style', `background-color: ${colors[ind]}`);
        ind = ind + 1;
        if (ind === colors.length){
            ind = 0;
        }
    });
    /*
    On Submit:
        1) Store the guess tray values
        2) Replace each game board row with the previous row/guess value
        3) Determine how many are correct and/or in the right spot
        4) update the hints row according to the above
        5) update the other hints rows with the previous values
    */
    app.submit(submit);
}

app.submit = (submit) => {
    $(submit).on('click', function(){

    })
}

$().ready(() => {
    app.modals();
    app.dots();
    app.solution();
})