const synth = new Tone.PolySynth(Tone.Synth,{
    oscillator:{
        type:"triangle"
    },
    envelope:{
        attack:0.02,
        decay:0.1,
        sustain:0.3,
        release:1
    }
}).toDestination();

document
.getElementById("writer")
.addEventListener("keydown", playNote);

document
.getElementById("generateBtn")
.addEventListener("click", generatePerformance);

async function playNote(event){

    await Tone.start();

    const notes = {

        a:"C4",
        b:"D4",
        c:"E4",
        d:"F4",
        e:"G4",
        f:"A4",
        g:"B4",

        h:"C5",
        i:"D5",
        j:"E5",
        k:"F5",
        l:"G5",
        m:"A5",
        n:"B5",

        o:"C4",
        p:"D4",
        q:"E4",
        r:"F4",
        s:"G4",
        t:"A4",
        u:"B4",

        v:"C5",
        w:"D5",
        x:"E5",
        y:"F5",
        z:"G5"
    };

    if(event.key === " "){

        synth.triggerAttackRelease(
            ["C3","G3"],
            "4n"
        );

        return;
    }

    if(event.key === "Enter"){

        synth.triggerAttackRelease(
            ["C4","E4","G4","B4"],
            "2n"
        );

        return;
    }

    const key =
    event.key.toLowerCase();

    if(notes[key]){

        const note =
        notes[key];

        const chord = [

            note,

            Tone
            .Frequency(note)
            .transpose(4)
            .toNote(),

            Tone
            .Frequency(note)
            .transpose(7)
            .toNote()
        ];

        synth.triggerAttackRelease(
            chord,
            "8n"
        );
    }
}

async function generatePerformance(){

    await Tone.start();

    const text =
    document
    .getElementById("writer")
    .value
    .toLowerCase();

    let index = 0;

    const notes = [
        "C4",
        "D4",
        "E4",
        "F4",
        "G4",
        "A4",
        "B4"
    ];

    const interval = setInterval(()=>{

        if(index >= text.length){

            clearInterval(interval);

            return;
        }

        const char =
        text[index];

        if(char >= "a" && char <= "z"){

            const note =
            notes[
                char.charCodeAt(0)
                %
                notes.length
            ];

            synth.triggerAttackRelease(
                note,
                "8n"
            );
        }

        index++;

    },250);
}