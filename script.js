console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Let the Skyfall ~Adele", filePath: "songs/1.mp3", coverPath: "covers/1.png"},
    {songName: "Runaway ~Aurora", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "A Thousand Years ~Christina Perri", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Daylight ~David Kushner", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Numb little Bug ~Em Beihold", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "I Wanna be yours X Summertime Sadness", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Inifinity ~Jaymes Young", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Somewhere Only We Know ~Keane", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Summertime Sadness ~Lana Del rey", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Mind Over Matter ~Young the Gaint", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Nothing's New ~Rio Romeo", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Happier ~Olivia Rodrigo", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "Let Her Go ~Passenger", filePath: "songs/13.mp3", coverPath: "covers/13.jpg"},
    {songName: "Diamonds ~Rihanna", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
    {songName: "Seafret ~Atlantis", filePath: "songs/15.mp3", coverPath: "covers/15.jpg"},
    {songName: "Set Fire To The Rain ~Adele", filePath: "songs/16.mp3", coverPath: "covers/16.jpg"},
    {songName: "Summertime Sadness X Dark Paradise ~lana Del Rey", filePath: "songs/17.mp3", coverPath: "covers/17.jpg"},
    {songName: "Running Through My head", filePath: "songs/18.mp3", coverPath: "covers/18.jpg"},
    {songName: "Dance Monkey", filePath: "songs/19.mp3", coverPath: "covers/19.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

audioElement.addEventListener('ended', () => {
    // Automatically play the next song
    if (songIndex < songs.length - 1) {
        songIndex++;
        playSong();
    } else {
        // If it's the last song, reset to the first song
        songIndex = 0;
        playSong();
    }
});

// Function to play the song based on songIndex
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    makeAllPlays();
    songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove('fa-play-circle');
    songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add('fa-pause-circle');
};

// Initial play of the first song
playSong();
