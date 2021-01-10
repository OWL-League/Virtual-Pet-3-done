class Food{
    constructor(){
        this.foodStock = 20;
        this.lastFeed = null;
        this.image = loadImage("images/Milk.png");


    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFeedTime(lastFeed){
        this.lastFeed = lastFeed;
    }

    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock-1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    bedroom(){
        background(bedroomIMG, 550, 500);
    }

    garden(){
        background(gardenIMG, 550, 500)
    }

    bathroom(){
        background(bathroomIMG, 550, 500)
    }

    display(){
        background(46, 139, 187);
        fill(255);
        textSize(15);

        if(lastFeed >= 12){
            text("Last Feed: " + lastFeed%12 + " pm", 350, 30);
          }
          else if(lastFeed === 0){
            text("Last Feed: 12 am", 350, 30);
          }
          else{
            text("Last Feed: " + lastFeed + " am", 350, 30);
          }

        var x  = 80, y = 100;
        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);

        if(this.foodStock!==0){
            for(var i = 0; i<this.foodStock; i++){
                if(i%10 === 0){
                    x = 80;
                    y = y+50;
                }
                image(this.image, x, y, 50, 50);
                x = x+30;
            }
        }
    }
}