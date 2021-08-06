const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById('play');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const next = document.getElementById('next');
const prev = document.getElementById('prev');

let progress = document.getElementById("progress");
let total_duration= document.getElementById("duration");
let current_time= document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");

const songs =[{
        name:"a",
        title:"It's You",
        artist:"Ali gatie"
        
    },{
        name:"b",
        title:"Chal Ghar Chalen",
        artist:"Arijit singh"

    },{
        name:"c",
        title:"Gustakhiya",
        artist:"Mayank Maurya"
    },{
        name:"a",
        title:"It's You",
        artist:"Ali gatie"
            
    
    }
]
let isPlaying = false;
//for play function
const  playMusic=()=>{
    isPlaying = true;
    music.play();    
    play.classList.replace("fa-play","fa-pause");
    img.classList.add("anime");
};
//for pause function
const pauseMusic= ()=>{
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause","fa-play",);
    img.classList.remove("anime");
};

play.addEventListener('click',()=>{
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
});

// changing the music data
const loadSong = (songs)=>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music/"+songs.name+".mp3";
    img.src ="images/" +songs.name +".jpg";
};
songIndex =0;

// loadSong(songs[1]);

const nextSong=()=>{
    songIndex=(songIndex+1)% songs.length;
    loadSong(songs[songIndex]);
    playMusic();

}
const prevSong=()=>{
    songIndex=(songIndex-1 + songs.length)% songs.length;
    loadSong(songs[songIndex]);
    playMusic();

}

//progress js work
music.addEventListener('timeupdate',(event)=>{
    // console.log(event);
    const{currentTime, duration} = event.srcElement;
    console.log(currentTime);
    console.log(duration);

    let progress_time =(currentTime/duration)*100;
    // console.log(progress_time);
    progress.style.width = `${progress_time}%`;
     
    // music duration update
    
    let min_duration = Math.floor(duration/60);
    let sec_duration = Math.floor(duration %60);
    
    let tot_duration= `${min_duration}:${sec_duration}`;
    if(duration){
        total_duration.textContent = `${tot_duration}`;
   
    }
    // current duration update
    let min_currentTime = Math.floor(currentTime/60);
    let sec_currentTime = Math.floor(currentTime %60);
    
    
    if(sec_currentTime<10){
        sec_currentTime = `0${sec_currentTime}`;
    }
    
   let tot_currentTime= `${min_currentTime}:${sec_currentTime}`;
   current_time.textContent = `${tot_currentTime}`;  
});

progress_div.addEventListener('click',(event)=>{
    console.log(event);
    const{ duration } = music;

    let move_progress = (event.offsetX /event.srcElement.clientWidth)* duration;
    console.log(duration);
    console.log(move_progress);
    music.currentTime =move_progress;


})

// if music and call next song function
music.addEventListener("ended",nextSong)



next.addEventListener("click",nextSong);
prev.addEventListener("click",prevSong);



// play.addEventListener('click', ()=>{
//     if(music.paused) {
//         play.setAttribute("fa-play","play");
//         music.play();
//       } else {
//         pause.setAttribute("fa-pause","pause");
//         music.pause();
//       }

// });

