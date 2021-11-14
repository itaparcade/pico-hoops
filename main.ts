input.onGesture(Gesture.ThreeG, function () {
    if (sound_enabled == 0) {
        sound_enabled = 1
        music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
    } else {
        sound_enabled = 0
        music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
    }
})
serial.onDataReceived(serial.delimiters(Delimiters.Comma), function () {
    proximity = serial.readUntil(serial.delimiters(Delimiters.Comma))
    if (show_plot) {
        led.plotBarGraph(
        parseFloat(proximity),
        255
        )
        for (let index = 0; index <= shot_count; index++) {
            led.plot(index, 0)
        }
        if (shot_count >= 5) {
            for (let index = 0; index <= shot_count - 5; index++) {
                led.plot(index, 1)
            }
        }
    }
})
let proximity = ""
let shot_count = 0
let show_plot = 0
let sound_enabled = 0
basic.pause(500)
sound_enabled = 1
if (sound_enabled == 1) {
    music.startMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once)
}
basic.showString("Pico Hoops!")
show_plot = 1
let detect_proximity = 1
shot_count = -1
let proximity_threshold = 15
serial.redirect(
SerialPin.P2,
SerialPin.P1,
BaudRate.BaudRate9600
)
basic.forever(function () {
    if (detect_proximity == 1) {
        if (parseFloat(proximity) >= proximity_threshold) {
            shot_count = shot_count + 1
            if (shot_count < 9) {
                if (sound_enabled == 1) {
                    music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
                }
                basic.pause(500)
            } else {
                if (sound_enabled == 1) {
                    music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
                }
                basic.pause(500)
                if (sound_enabled == 1) {
                    music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
                }
                show_plot = 0
                basic.showString("Great Job!")
                basic.pause(500)
                show_plot = 1
                shot_count = -1
            }
        }
    }
})
