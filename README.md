# Setlist Generator

setlist generator for fun because I can, not because I stopped to think if I should.

While the intention of this project is tongue-in-cheek,
the logic and "rules" behind it for harmonic mixing are
based on the [Circle of Fifths](https://en.wikipedia.org/wiki/Circle_of_fifths)
AKA the [Camelot Wheel](https://www.soulglo.com/camelot-wheel/).

### Prerequisites

- Lexicon https://www.lexicondj.com/index
- Lexicon must be running, and you must turn on API mode to be able to connect and install your tracks.
- You can enable the API in the Lexicon settings under Integrations.

### Getting Started

- Run `install.sh` to build a local JSON file `./src/asset/data/alltracks.json` from your Lexicon library
- This `data` directory is ignored

### Roadmap

Current version: Alpha - some options are randomized, others hard-coded for the proof-of-concept

Next versions will include user selection
for BPM, Starting Key, Starting Track, [Level of Entropy](./Entropy.md)
for how varied a set of tracks to play.
