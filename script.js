
/* ==== Task - 1 : SETUP VARIABLES ==== */

/* =====GET PLAYER FROM HTML ===== */
const player = document.getElementById('player');  /* HINT: player id */
const shadow = document.querySelector('.player-shadow');  /* HINT: player-shadow id */
/* ===== POSITION VARIABLES ===== */
let x = 100;                    /* Player's left position */
let y = 0;                      /* Player's up/down position */

/* ===== MOVEMENT VARIABLES ===== */
let velocityY = 0;        /* HINT: How fast falling (0) */
let moveLeft = false;         /* HINT: Is player moving left? (true/false) */
let moveRight = false;        /* HINT: Is player moving right? (true/false) */
let jumping = false;          /* HINT: Is player jumping? (true/false) */

/* ===== GAME VARIABLES ===== */
let score = 0;                  /* How many coins collected */
let gameCompleted = false;    /* HINT: Did player win? (true/false) */

/* ===== TIMING VARIABLES ===== */
let lastSpaceTime = 0;          /* Last time space was pressed */
const DOUBLE_PRESS_DELAY = 300; /* Time between double presses (ms) */







/* ==== Task - 2 : START GAME FUNCTION ==== */
/* ===== WHEN PLAYER CLICKS START ===== */
function startGame() {                  /* HINT: define startGame funtion */
    
    /* HIDE START SCREEN */
    document.getElementById('start').style.display = 'none';
    
    
}

function closePopup(){
    document.getElementById('start').style.display = 'flex';
    document.getElementById('contactPopup').classList.remove("show")
    
    x=100;
    y = 0;
    coin = 0;
    gameCompleted = false
    document.getElementById('coins').innerText = "COINS:0"
    location.reload()
}



/* ==== Task - 3 : SUBMIT FORM FUNCTION ==== */
/* ===== WHEN PLAYER SUBMITS FORM ===== */
function SubmitForm() {
    
    alert('🚀 We Will Contact You Soon!');  /* HINT: "Success Message" */
    document.getElementById('start').style.display = 'flex';
    document.getElementById('contactPopup').style.display='none'
    
    x=100;
    y = 0;
    coin = 0;
    gameCompleted = false
    document.getElementById('coins').innerText = "COINS:0"
    location.reload()

}

function showDamageEffect(){
    const effect = document.getElementById("damageEffect");
    effect.classList.add("active");
    
    document.body.classList.add("shake");
    document.getElementById("gameOver").classList.add("show");  /* HINT: 'flex' to show */
    setTimeout(() => {
        effect.classList.remove("active")
        document.body.classList.remove("shake");
    },500);
}



/* ==== Task - 4 : KEYBOARD EVENTS  ==== */
/* ===== WHEN KEY IS PRESSED DOWN ===== */
document.addEventListener('keydown', e => {
    
    /* ===== RIGHT ARROW KEY ===== */
    if (e.key === 'ArrowRight') {
        moveRight = true;  /* HINT: true/false */
        

    }
    
    /* ===== LEFT ARROW KEY ===== */
    if (e.key === 'ArrowLeft') {
        moveLeft = true;   /* HINT: true/false */
        
    }
    
    /* ===== SPACEBAR TO JUMP ===== */
    if (e.code === 'Space' || e.key=== "ArrowUp" && !jumping) {  /* HINT: space key pressed */
        velocityY = -24;       /* Move UP (negative = up) */
        jumping = true;    /* HINT: true/false */
        shadow.style.transform = 'scale(0.5)';  /* Squash shadow when jump */
        shadow.style.opacity = '0.15';  /* Fade shadow when jump */
    }
    
    /* ===== DOUBLE TAP SPACEBAR ===== */
    if (e.code === 'Space' || e.key==="ArrowUp") {              /* HINT: space key pressed */
        const now = Date.now();              /* Current time in milliseconds */
        
        /* IF PRESSED AGAIN WITHIN 300MS */
        if (now - lastSpaceTime < DOUBLE_PRESS_DELAY) {
            velocityY = -24;
            jumping = true;              /* HINT: true/false */
        }
        
        lastSpaceTime = now;
    }
});

/* ===== WHEN KEY IS RELEASED ===== */
document.addEventListener('keyup', e => {
    
    /* ===== RIGHT ARROW KEY RELEASED ===== */
    if (e.key === 'ArrowRight') {              /* HINT: 'ArrowRight' */
        moveRight = false;                /* HINT: false */
    }
    
    /* ===== LEFT ARROW KEY RELEASED ===== */
    if (e.key === 'ArrowLeft') {              /* HINT: 'ArrowLeft' */
        moveLeft = false;                 /* HINT: false */
    }
});








/* ==== Task - 5 : PARTICLE EFFECTS  ==== */
/* ===== CREATE FLOATING PARTICLES ===== */
function createParticles(x, y) {          /* HINT: function name to createParticles */
    
    /* CREATE 10 PARTICLES */
    for (let i = 0; i <10; i++) {      /* HINT:  mention start, end and interval values */
        
        /* CREATE NEW ELEMENT */
        let p = document.createElement('div');
        
        /* ADD CSS CLASS */
        p.classList.add('particle');
        
        /* POSITION PARTICLE */
        p.style.left = x + 'px';               /* HINT: mention units */
        p.style.top = y + 'px';                /* HINT: mention units */
        
        /* ADD TO PAGE */
        document.body.appendChild(p);
        
        /* REMOVE AFTER 1 SECOND */
        setTimeout(() => {
            p.remove();
        }, 1000);
    }
}



/* ==== Task - 6 : MAIN GAME LOOP  ==== */
/* ===== MAIN GAME LOOP ===== */
function gameLoop() {
    
    /* ONLY RUN IF GAME NOT COMPLETED */
    if (!gameCompleted) {                /*HINT :   game will run only if gameCompleted variable is false */
        
        /* ===== MOVEMENT ===== */
        
        /* MOVING RIGHT */
        if (moveRight) {                                /* variable that hold access to move right */
            x += 7;                               /* Move RIGHT 7 pixels */
            player.style.transform = 'scaleX(1)';     /* Face RIGHT */
            player.classList.add('walk');             
        }
        
        /* MOVING LEFT */
        if (moveLeft) {                               /* variable that hold access to move left */
            x -= 7;                             /* Move LEFT 7 pixels */
            player.style.transform = 'scaleX(-1)';    /* Face LEFT */
            player.classList.add('walk');            
        }
        
        /* NOT MOVING */
        if (!moveRight && !moveLeft) {                 /* variable that hold access to move left or right */
            player.classList.remove('walk');     
        }
        
        /* BOUNDARY CHECK */
        if (x < 0) x = 0;  /* Don't go left of screen */
        
        
        /* ===== GRAVITY & JUMPING ===== */
        
        /* APPLY GRAVITY (make fall) */
        velocityY += 1.2;  /* Get faster as fall */
        
        /* UPDATE POSITION */
        y += velocityY;
        

        /* LAND ON GROUND */
        if (y > 0) {
            y = 0;                 /* Stop at ground level */
            velocityY = 0;         /* Stop falling */
            jumping = false;    /* HINT: true/false */
            shadow.style.transform = 'scale(1)';  /* Reset shadow size */
            shadow.style.opacity = '0.4';  /* Reset shadow opacity */
        }
        
        if (y < -450) {  /* Limit how high you can jump */
            y = Math.max(-450,Math.min(y,0));  /* Limit falling and jumping height */
            velocityY = 0;
        }
        /* ===== DRAW PLAYER ON SCREEN ===== */
        
        player.style.left = x + 'px';           /* HINT: join units */
        player.style.top = (window.innerHeight - 220 + y) + 'px';  /* HINT: join units */
        shadow.style.top = (window.innerHeight - 120 ) + 'px';
        shadow.style.left = player.style.left; /* Move shadow with player */
        
        
        /* ===== CAMERA FOLLOW ===== */
        
        window.scrollTo(x - 300, 0);  /* Scroll to follow player */
        
        
        /* ===== COIN ease-in-outCOLLECTION ===== */
        
        document.querySelectorAll('.coin').forEach(coin => {
            
            /* ONLY CHECK IF COIN IS VISIBLE */
            if (coin.style.display !== 'none') {  /* HINT: 'none' */
                
                /* GET COIN POSITION */
                let cx = coin.offsetLeft;
                let cy = coin.offsetTop;
                
                /* CHECK IF PLAYER TOUCHED COIN */
                if (
                    x + 60 > cx &&
                    x < cx + 35 &&
                    player.offsetTop < cy + 35 &&
                    player.offsetTop + 90 > cy
                ) {
                    
                    coin.style.display = 'none';  /* HINT: 'none' */
                    score++;                          /* Add 1 to score */
                    
                    /* UPDATE SCORE DISPLAY */
                    document.getElementById('coins').innerText = "COINS:" + score;  /* HINT: update 'score' value */
                    
                    player.className = "player";

                    if(score >= 1){
                        player.classList.add("evo1");
                    }
                    if(score >= 2){
                        player.classList.add("evo2");
                    }
                    if(score >= 3){
                        player.classList.add("evo3");
                    }
                    if(score >= 4){
                        player.classList.add("evo4");
                    }
                    if(score >= 5){
                        player.classList.add("evo5");
                    }

                    /* CREATE PARTICLES */
                    createParticles(cx, cy);

                }
            }
        });
        
        
        /* ===== ENEMY COLLISION ===== */
        
        document.querySelectorAll('.enemy').forEach(enemy => {
            
            let ex = enemy.offsetLeft;
            
            /* CHECK IF PLAYER HIT ENEMY */
            if (
                x + 60 > ex &&
                x < ex + 60 &&
                y > -50
            ) {
                showDamageEffect();  /* Show damage effect */
                gameCompleted = true;                 /* HINT: true/false */
                moveLeft = false;                        /* HINT: true/false */
                moveRight = false;  
                
                
                
            }
        });
        
        
        /* ===== WIN CONDITION ===== */
        
        const flag = document.getElementById('flag'); 
        const flagPosition = flag.offsetLeft;
        
        /* IF PLAYER REACHES FLAG WITH ALL COINS */
        if (
            x >= flagPosition - 100 &&
            score >= 5 &&
            !gameCompleted
        ) {
            gameCompleted = true;                 /* HINT: true/false */
            moveLeft = false;                        /* HINT: true/false */
            moveRight = false;                      /* HINT: true/false */
            
            /* SHOW CONTACT FORM */
            document.getElementById('contactPopup').classList.add("show");         /* HINT: 'flex' to show/ 'none' to hide  */
        }  
        
        if(x >= flagPosition - 100 &&
            score < 5 &&
            !gameCompleted){
                gameCompleted = true;                 /* HINT: true/false */
                moveLeft = false;                        /* HINT: true/false */
                moveRight = false;  
                let missed = 5 - score;
                document.getElementById("missingcoins").innerText = "Coins Missed: " + missed;
                document.getElementById("badEnding").classList.add("show");
                
            }
    }
    
    /* LOOP FOREVER */
    requestAnimationFrame(gameLoop);
}

/* START THE GAME LOOP */
gameLoop();
