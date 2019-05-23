import './playerStars.html'

Template.playerStars.helpers({
    amountOfStars: function() {
        const totalStars = this.amountWins;
        const stars = [];
        for (let i = 0; i < totalStars; i+=1) {
            stars.push(i);
        }
        return stars;
    }
});