function updateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar'); // Wähle alle Balken aus
  
    progressBars.forEach((bar, index) => {
        // Beispiel: Der Fortschritt für jeden Balken wird zufällig geändert
        let progress = Math.floor(Math.random() * 101); // Zufallszahl zwischen 0 und 100
        bar.style.width = `${progress}%`; // Aktualisiere die Breite des Fortschrittsbalkens
        bar.setAttribute('data-progress', progress); // Optional: Setze das neue Fortschrittsattribut
    });
  }