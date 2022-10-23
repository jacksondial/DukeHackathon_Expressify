# Duke Hackathon Emotion Expression Classifier for Autism 

## Inspiration
Individuals with autism often struggle with alexithymia, which is characterized by difficulty in understanding one's own emotional state and can lead to a lack of empathy while interacting with others in society. This introduces a need for developmental curricula to aid in strengthening associations between emotions and various stimuli.

Current curriculums are available in various forms, such as the LuxAI QTRobot, a doll-size robot targeted at educating autistic and special needs children. It was deemed of importance, however, to develop a more accessible resource, one that could potentially allow autistic children to learn the associations between emotions without being fully aware they are doing so. Therapies exist that aim to exploit human-native (1) connections between emotions and colors, where the color was shown at the same time as a phrase was read, or an image shown, for example.

## What it does
Our chrome extension enables individuals to turn on live-captioning for Youtube videos, where the background color of the captions changes to be the color associated with the overall mood of the current phrase.

## How we built it
We used sentiment analysis to take in the transcriptions of a selected video and classify phrases as 1 of 7 sentiments. We manually associated each of the 7 sentiments with a color that is often naturally seen as associated with that sentiment (1) (2).

## Challenges we ran into
It was difficult only selecting 7 emotions, as the human brain can process over 27 categories of emotion (3).

## What's next for Expressify
Adding computer vision techniques to classify facial expressions, adding customization with different color palettes to cover a wider range of people on the spectrum, and creating a platform for allowing users to practice specific emotions.

1) [link](https://doi.org/10.3758/s13428-015-0598-8) 2) [link](https://embrace-autism.com/mapping-intensity-and-prevalence-of-emotions/) 3) [link](https://www.pnas.org/doi/10.1073/pnas.1702247114) 4) [link](https://rdcu.be/cX7pJ)