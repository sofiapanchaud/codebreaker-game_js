const app = {};
const modal = $('.modal');
const modalBtn = $('.modal-close');
const openModal = $('.modal-open');

app.modals = () => {
    modalBtn.on('click', function(e){
        modal.removeClass('is-open');
    });
    openModal.on('click', function(e){
        e.preventDefault();
        const matchId = $(this).attr('id');
        $(`.${matchId}`).addClass('is-open');
    })
}

$().ready(() => {
    app.modals();
})