const app = {};

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

$().ready(() => {
    app.modals();
})