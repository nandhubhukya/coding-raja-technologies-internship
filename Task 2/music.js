document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playlist = document.getElementById('playlist');
    const library = document.getElementById('library');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const shuffleButton = document.getElementById('shuffle');
    const repeatButton = document.getElementById('repeat');
    const progressBar = document.getElementById('progress-bar');
    const volumeControl = document.getElementById('volume-control');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');

    let tracks = [
        { title: 'Track 1', src: 'track1.mp3' },
        { title: 'Track 2', src: 'track2.mp3' },
        // Add more tracks as needed
    ];
    let currentTrackIndex = 0;
    let isShuffling = false;
    let isRepeating = false;

    function loadTrack(index) {
        audioPlayer.src = tracks[index].src;
        audioPlayer.play();
        updateTrackInfo();
    }

    function updateTrackInfo() {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
        progressBar.max = audioPlayer.duration;
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return ${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')};
    }

    function playTrack() {
        audioPlayer.play();
    }

    function pauseTrack() {
        audioPlayer.pause();
    }

    function nextTrack() {
        if (isShuffling) {
            currentTrackIndex = Math.floor(Math.random() * tracks.length);
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        }
        loadTrack(currentTrackIndex);
    }

    function previousTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
    }

    function toggleShuffle() {
        isShuffling = !isShuffling;
        shuffleButton.textContent = isShuffling ? 'Shuffle (On)' : 'Shuffle (Off)';
    }

    function toggleRepeat() {
        isRepeating = !isRepeating;
        repeatButton.textContent = isRepeating ? 'Repeat (On)' : 'Repeat (Off)';
    }

    function updateProgress() {
        progressBar.value = audioPlayer.currentTime;
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    }

    function updateVolume() {
        audioPlayer.volume = volumeControl.value;
    }

    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', () => {
        if (isRepeating) {
            loadTrack(currentTrackIndex);
        } else {
            nextTrack();
        }
    });

    playButton.addEventListener('click', playTrack);
    pauseButton.addEventListener('click', pauseTrack);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', previousTrack);
    shuffleButton.addEventListener('click', toggleShuffle);
    repeatButton.addEventListener('click', toggleRepeat);
    progressBar.addEventListener('input', () => {
        audioPlayer.currentTime = progressBar.value;
    });
    volumeControl.addEventListener('input', updateVolume);

    // Load the first track
    loadTrack(currentTrackIndex);
});