import './playerStars.html'

Template.playerStars.helpers({
    amountOfStars: function() {
        const totalStars = this.amountWins;
        console.log(totalStars);
        const stars = [];
        for (let i = 0; i < totalStars; i+=1) {
            stars.push(i);
        }
        console.log(stars);
        return stars;
    }
});