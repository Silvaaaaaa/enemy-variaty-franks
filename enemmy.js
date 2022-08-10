 document.addEventListener("DOMContentLoaded", function(){
    let worm = document.querySelector("#worm");
    let ghost = document.querySelector("#ghost");
    let spider = document.querySelector("#spider");
 let canvas = document.querySelector("#canvas1");
 let ctx = canvas.getContext('2d');
 canvas.width = 500 ; 
 canvas.height = 800 ; 

class Game{
   constructor(ctx , width , height ){
       this.ctx = ctx ; 
       this.width = width  ;
       this.height = height ; 
      this.enemies = [];
      this.enemyInterval = 200 ;
      this.enemytimer =  0; 
      this.enemytype = ['worm' ,'ghost' ,'spider'];
   }
   update(deltatime){
       this.enemies = this.enemies.filter(object =>  !object.marketfordelete)
     if (this.enemytimer > this.enemyInterval){
         this.#addNewEnemy();
         this.enemytimer =  0 ; 
     }else{
         this.enemytimer +=deltatime ;
     }
        this.enemies.forEach(object => object.update(deltatime));
   }    
   draw(){
    this.enemies.forEach(object => object.draw(this.ctx));
   }
   #addNewEnemy(){ // private methods oop 
      const randomenemy = this.enemytype[Math.floor(Math.random() * this.enemytype.length)]
       if(randomenemy === 'worm')
      this.enemies.push(new Worm(this))
       else if(randomenemy === 'ghost')
      this.enemies.push(new Ghost(this))
      else if(randomenemy === 'spider')
      this.enemies.push(new Spider(this))
       
    //    this.enemies.sort(function(a,b ){
    //        return b.y - b.y ;
    //    })
   }
}
class Enemy{     
    constructor(game){
     this.game = game;    
      this.marketfordelete = false ; 
      this.framex = 0  ;
      this.maxframe = 5 ;
      this.frameinterval = 100 ; 
      this.frametime = 0 ; 
    }
    update(deltatime){
      this.x-= this.speed  * deltatime;
      if (this.x < 0 - this.width){
          this.marketfordelete = true ; 
      }  
      if(this.frametime < this.frameinterval ){
          if(this.framex < this.maxframe )
              this.framex ++ ;
              else 
              this.framex = 0 ;
              this.frametime = 0 ;  
      }else {
        this.frametime += deltatime;
      }
    }
    draw(ctx){
    ctx.drawImage(this.image ,this.framex * this.spritiwidth,0,this.spritiwidth ,this.spritHeight , this.x ,this.y , this.width , this.height );
    }
}
class Worm extends Enemy {
    constructor(game){
        super(game);
        this.spritiwidth = 229 ; 
        this.spritHeight = 171  ;
        this.width = this.spritiwidth/2 ;    
        this.height = this.spritHeight/2 ; 
        this.x  = this.game.width  ;
      this.y = this.game.height - this.height;
        this.image = worm  ; 
        this.speed = Math.random() * 0.1 + .1 ;
    }
}
class Ghost extends Enemy {
    constructor(game){
        super(game)
        this.spritiwidth = 261; 
        this.spritHeight = 209  ;
        this.width = this.spritiwidth/2 ;    
        this.height = this.spritHeight/2 ; 
        this.x  =this.game.width  ;
      this.y = Math.random() * this.game.height * 0.6 ;
        this.image = ghost  ; 
        this.speed = Math.random() * 0.1 + .1 ;
        this.angle = 0 ;
     this.cuvers = Math.random() * 3 ; 
    }
    update(deltatime){
       super.update(deltatime);
     this.y += Math.sin(this.angle) * this.cuvers;
     this.angle+=0.4 ; 
    }
    draw(){
        ctx.save();
        ctx.globalAlpha = 0.5 ; 
        super.draw(ctx)
        ctx.restore();
    }
}
class Spider extends Enemy {
    constructor(game){
        super(game);
        this.spritiwidth = 310 ; 
        this.spritHeight =  175  ;
        this.width = this.spritiwidth/2 ;    
        this.height = this.spritHeight/2 ; 
        this.x  =Math.random() * this.game.width  ; 
      this.y = 0 - this.height;
        this.image = spider  ; 
        this.speed = 0 ;
        this.vy = Math.random() * 0.1 + 0.1  ; 
        this.maxlength = Math.random() * this.game.height ; 
    }
    update(deltatime){
        super.update(deltatime);
        if (this.y < 0 - this.height * 2 ){
            this.marketfordelete = true ; 
        }  
        this.y += this.vy * deltatime; 
        if(this.y > this.maxlength )this.vy *= -1 ; 
    }
    draw(ctx){
     ctx.beginPath();
    ctx.moveTo(this.x  + (this.width * 0.5),0 );
    ctx.lineTo(this.x + (this.width * 0.5) , this.y +10 );
    ctx.stroke();
     super.draw(ctx)
    }
}
const game = new Game(ctx , canvas.width , canvas.height);
let lasttime  = 1 ; 
function animate(timestamp){
   ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    const deltatime = timestamp -lasttime ; 
    lasttime = timestamp ; 
    game.update(deltatime);
    game.draw()
    requestAnimationFrame(animate);
}  
animate(0);
})