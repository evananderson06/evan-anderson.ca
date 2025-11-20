---
title: "How we Built MustDance in 18 Hours"
date: "2025-11-18"
desc: "We joined an 18 hour hackathon and built a Just Dance clone."
image: "/images/mustdance/ui.png"
---

*TL;DR: We joined an 18 hour hackathon and built a Just Dance clone.*

[Devpost](https://devpost.com/software/mustdance)

### The Idea
Learning to dance can be intimidating for beginners. While beginner dance lessons are widely available, sometimes this isn't enough to get rid of someone's fear of judgement. A great solution to this is the game Just Dance.

I remember playing it in Grade 3 on the SMART Boards at school when it was too cold to go outside. There's one problem. Is your all-time favorite song on Just Dance? How about that super cool remix you found on Soundcloud? Probably not... Until now.

Me, [Boyd](https://www.linkedin.com/in/boydroberthamilton/), and [Aayush](https://www.linkedin.com/in/aayush-maharaj/) joined HackCamp 2025, and decided to make an app that generates a follow along dance video to any song, watches you dance, and grades you. We had 18 hours, a lot of caffeine, and a long night ahead of us.

### The Team
None of us had ever worked with OpenCV or Mediapipe before, so we all had a lot of learning to do. I focused mainly on connecting our backend to the frontend, as well as syncing the user video with the reference video. Boyd did a lot of work on beat detection and dance video generation. Aayush did a ton of work on the grading system and helped get the recording working on the website. I also danced for the silhouette generation :)

### How It Works
This app had multiple components working together. I'll break each one down, and explain how it works.

#### The Frontend
The frontend is quite simple, and was built using React. It was responsible for all user interaction, mainly, uploading a song, and recording a video. The biggest challenge with this was managing the state of the app, as sometimes we would be waiting for long processes in the backend to finish before we could move forward. This didn't take us long to build, and most of our time was focused on other parts of this project.

![The frontend](/images/mustdance/ui.png)

#### Dance Video Generation
We took some videos of me dancing. We made each video exactly 4 bars long at 120bpm. In each video I tried to start and end in the same position to make stitching the videos together smooth. Once we had these videos, we made a silhouette generator, which used OpenCV and Mediapipe's Selfie Segmentation to mask me out as one color.

For the dance to feel natural, it needed to match up with the beats in the song. To do this we used Librosa, which analyzed each song, and found the BPM and exact timestamps for every beat. This was extremely important because if you're off by even 2 BPM, you will be out of sync by about half a bar 15 seconds in.

![2 BPM difference after 15 seconds](/images/mustdance/syncexample.png)
*2 BPM difference after 15 seconds*

Now that we had analyzed the song, we randomly chose dance moves, and stitched their videos together. This was done by scaling the speed of the videos so their start and end times matched perfectly with 16 beat segments that Librosa found. This resulted in the generated videos being impressively synced to the music, exactly what we needed. We put everything together using ffmpeg (shoutout to GitHub Copilot for this), and then sent the video to the frontend.

![A generated dance video](/images/mustdance/danceoutput.gif)
*A generated dance video*

#### Grading
Once a user finishes dancing, their video gets sent back to the server for grading. To do this we used pose estimation. First we convert the video from the browser to an mp4 using ffmpeg. We then take a frame from each video every 2 seconds, and run pose estimation on both of them. The poses are normalized by scaling and repositioning the hip midpoints to line up. After that we take the average difference between each landmark, with a higher difference resulting in a lower score.

Once all the frames are processed we are left with a collection of scores between 0 and 1. We scale them up by a factor of 100 and sum them together to calculate a final score. The percentage accuracy is then calculated using the users score compared to the maximum possible score.

*Thank you to Evan Hodson for these great examples*

![An example of a good grade: Poses are clearly similar](/images/mustdance/goodgrade.png)
*An example of a good grade: Poses are clearly similar*

![An example of a bad grade: Poses are quite different](/images/mustdance/badgrade.png)
*An example of a bad grade: Poses are quite different*

This process took a long time, usually taking a couple of minutes for a full song, so there was a lot of room for improvement here. Because of this I decided to create a separate thread for both video generation and grading, which helps the server continue to function while these processes run. This felt pretty cool as we were just learning about concurrency in our software class. 

The results were quite impressive, and when we were testing it, the change in scores made sense (e.g. actually following along or just standing). We had a lot of fine tuning to do, but once we had it working well we were quite happy with it.

### The Challenges
There were a lot of challenges with this project. One of the main ones was figuring out how to grade the videos. Having little experience with OpenCV made this difficult, but we got it working in the end.

The other tricky part was syncing the dance clips to any given song. We had a lot of data from Librosa, and finding which data was the best to use for this took us a while, leading us to eventually settle with beat frames.

### What we learned
The main takeaway from this project was the experience of working under a time constraint. Every choice we made involved factoring in how much time we had. In previous personal projects, I've had very long time frames, where a choice that would take longer simply meant more work for me. In HackCamp, adding more work could mean not finishing the project. This meant we made a lot of important tradeoffs, and learning to do so under pressure was extremely valuable.

On the tech side of things, I learnt a lot about the computer vision libraries we used. How they handled files, pose estimation etc. I haven't done a lot of work in python recently either, so this was a great refresher for me.

### The Result
For our submission we had to make a demo video (you can watch this on our [Devpost](https://devpost.com/software/mustdance)). We didn't realize that the video was the only thing the judges were going to see, so we didn't put on a great performance, 
but it didn't bother us too much.

The project worked way better than we expected, everyone who got to try it seemed quite impressed, and we all had so much fun. The sleepless night was totally worth it, and we would totally do it again. Zero regrets.

Thanks for reading!
