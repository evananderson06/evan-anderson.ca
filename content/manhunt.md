---
title: "The Story of Manhunt"
date: "2025-11-09"
---

*TL;DR: We built a real-time manhunt management system from scratch, ran two large scale events (~350 people), everything broke at the worst time, we improvised, people loved it.*

### How It Started
It's October of first-year and I met a guy with the same name as me, [Evan Hodson](https://www.linkedin.com/in/evanhodson/). We bonded over the fact that both of our names were Evan. To be honest that's really the only thing I can remember that made us friends. 

I learned that in Grade 12 he ran a game of manhunt in Waterloo with all of his friends. It was called the Hodson Hunt. He talked about how he watched everyone's location using a huge Life360 circle; he sent borders to the players by sending annotated screenshots of Google Maps. Then he started talking about how he had this vision of creating an app that could do all of this without the hassle of multiple services and scuffed communication. I thought for a second about how I would build something for him, and then I told him I could do it.

We had two goals.

1. The Second Hodson Hunt (~50 People)
2. UBC Hunt (As many people as possible)

### Planning and Implementing
We started planning very quickly. The Figma board was made, and we both got to work. Evan had never really used Figma before, and I didn't know a ton about it either. I'm sure you can imagine that this board was a disaster. 

![Original Figma Board](/images/manhunt/figmaboard.png)*Entire Hodson Hunt Figma board*

This design file drove all of the development. When Evan added a feature, I implemented it. If I felt like we needed another page, I told him to design it. We just repeated this until it was done. It was quite the process, and you can really see the similarity between this board and the final result.

![Planned Home Screen](/images/manhunt/plan.png)*Admin home screen on figma*

![Actual Home Screen](/images/manhunt/result.jpg)*Admin home screen in production*

With the two images above you can really see the similarity between our design and the result in production. I'd say this goes to show that you don't need to be a highly experienced designer to make a big project like this, just jump in and see what happens. No one is expecting you to make the perfect UI/UX design on your first try.

### The Architecture
I'm going to talk more about the tech behind this app. If you don't want to read about that maybe skip to the next section.

Evan asked ChatGPT how someone could build something like this, and when we had our first meeting, he brought up the idea of using a service called [Traccar](https://www.traccar.org/). Traccar - an open source "Modern GPS Tracking Platform" - from my understanding is designed for companies to track fleets of cars, aircraft, etc. Fortunately, they happened to have a mobile client that could connect to their servers, and broadcast a smartphones location to the app. The other big win with Traccar was that it comes with a WebSocket API that broadcasts changes to device locations, allowing us to make updates in realtime. I installed Traccar locally, tinkered with its API, and I realized that it was perfect for what we need, tracking people, not cars.

With a local installation of Traccar ready to go, I made a Next.js app and set it up with Supabase. I set up the database, made admin users, made all the views, and everything else I needed, except real-time updates. The issue with the Traccar API is that with my setup, it exposed all players locations. I wanted to ensure users could only see their own location, and that meant the client could never receive other players' locations.

My solution for this problem was my own WebSocket Server, Hodson Middleman. This server would connect to the Traccar WebSocket, update player locations in the Supabase database, and also send them out to WebSocket clients. I also needed something that was always running to control the borders, so Hodson Middleman also watched and managed border changes. I drew a quick diagram that outlines the communication between each service. TLDR: everything talks to everything

![Rough Architecture Diagram](/images/manhunt/arch.png)*Very rough architecture diagram*

### Game 0 - UBC Test
April rolled around and everything was finally done. Balancing school and this project caused development to move slow, but we were still on track for Hodson Hunt in May. It was time to test it out.

We invited 25 of our friends to come to the very first beta test of our software. It was quite the success, and everyone had fun. You can watch Evan's video that covered it [here](https://www.youtube.com/watch?v=XRLD9SEvb80).

![Participants in the UBC Beta Test](/images/manhunt/ubcbeta.jpeg)*All of the participants in the UBC Beta Test*

We came out of this with a couple of things to work on. To summarize them:
- We needed to ensure players login using their main browser, and not through something like the Instagram browser, otherwise our QR Code tags wouldn't work
- UI needed better consistency, sometimes the same icon on a different map, meant a different thing
- Admin side needed some safety features, like confirming start/end game, removing players, etc.

We worked on those towards the month leading up to Hodson Hunt, and we felt ready to go.

### Game 1 - Hodson Hunt
It was finally May. School was out and I was back home in Calgary. I got on a plane to Waterloo less than 24 hours before the game started. We setup our starting area, coordinated cars for players, and got all of our tech ready. We ended up with around 50 players, and it was amazing seeing all of our work come to life.

![Group of all Hodson Hunt players](/images/manhunt/hodsonhunt.jpg)*All of the players at Hodson Hunt*

From the tech side of things, everything went pretty smooth for our first game. We were definitely pushing Supabase with some very poorly designed database mutations, and we could see everything start slowing down on the admin side at this scale.

A lot of this slowly got fixed throughout the summer, but overall, our first big event was a success.

### More Planning
After this game things started to slow down a lot for me. We were on summer break, I was working a summer job, and the tech was pretty much done. Most of the planning throughout the summer was figuring out logistics for how we were going to pull this off at UBC. We wanted to do this properly, making a good impression on both the school and the participants. 

Part of doing it properly meant working with the university to make sure they were ok with what we were doing. We got in contact with UBC Film and Events, and went through the process of booking the parts of campus we wanted. To be honest I was surprised they let us pull this off, usually they work with major film/events companies, and we were just two students doing our own thing. This was the area they gave us, all for the big price of ~$20.

![Our UBC booking](/images/manhunt/bookingarea.png)*Our UBC booking*

We officially had the go-ahead from UBC. Now it was time to start marketing. UBC gave us a cap of 250 participants. O	ur goal was to reach that number. We knew some graphic designers who helped get us some posters and flyers to print. We also needed some online presence so we started making shortform ads, some reaching [over 90k views](https://www.tiktok.com/@ubchunt/video/7545367836043021576). 

We released the tickets, and sold out a couple of days before the event. 

Everyone wanted to play, and people kept asking if we could release more tickets. Our contract said we couldn't, and our contact at UBC Film and Events was on vacation... With just a few days until the event, Evan decided to physically walk into their office and ask them if we could change the contract. They said yes.

We released even more tickets, and in just a couple of days we sold over 100 more. We built up the hype, we had over 350 people ready to play, now we just need to pull it off. We were able to get about 8 volunteers for check-in, first-aid, and monitoring the boundaries. Huge shoutout to these volunteers because we literally would not have been able to do this without them. I prepared some volunteer documents to help make everything run smoothly. Evan was focusing on reaching out to businesses and organizations for potential sponsorship. We got all of our physical materials for the event and at that point we were ready to go.

### Game 2 - UBC Hunt
*Thank you to CUSVM for most of the photos in this section*

Everything was setup, volunteers were ready, and a line was starting to form by our check-in area. Just minutes before we started checking people in, the admin panel stopped loading. The website was still up, but no data from the admin panel would load. We needed the admin page to manage our borders, find the winners, and even to just start the game. I couldn't figure out what was going on, and we had over 300 people counting on us to run this event. After a bit of troubleshooting and no luck, me and Evan improvised.

![Line of people waiting](/images/manhunt/line.jpg)*The line of people waiting*

We decided to ditch the software. I made a Google Doc containing a screenshot of google maps with borders drawn on top. To us, it felt super scuffed, we knew what was supposed to happen and it wasn't this. At the end of the day the event was going to run and that's what mattered most.

Despite our doubts, the players had so much fun. We had an amazing response and everyone wanted to see it happen again. On our survey, almost everyone said they would recommend it to a friend, and most people rated it above 4/5 stars.

![Check-in table](/images/manhunt/checkin.jpg)*Our check-in table*

![Group of people before the event started](/images/manhunt/ubchuntstart.jpg)*Participants grouped up before the event started*

![Evan Anderson working at desk](/images/manhunt/me.jpg)*Credit: Bridghet Wood - Me working at my table*

![Group photo with everyone](/images/manhunt/ubcgroup.jpg)*Credit: Bridghet Wood - Group photo with all of the participants*

### What Happened
We had a little celebration after the event, as our year of work had finally paid off. When we got home there was still one thing on my mind; what happened to the website?

I started digging deep into the logs of every service we had, and then I found it. Vercel was killing my server actions because they were taking too long, specifically `getAllPlayers()` which would return info on every single player registered. This function was the slowest part of the app, because I had it making multiple database calls for every user. On the Vercel free plan, you are limited to how long these server actions can take, and if they take too long, they get stopped.

At this point I realized that had we been on a paid Vercel plan, this probably wouldn't have been an issue, but simply spending more money isn't always a great fix. When I looked into how this function worked, I noticed it was making 2 database calls per player, which doesn't make sense, but to be fair, I wasn't too familiar with more advanced SQL. I was eventually able to get this down to one call by using table joins, and this fixed everything.

### What I learned
I learned a ton working on this project. We came across so many unique challenges, and each one of them brought something new to the table. Here's a few of my main takeaways:
- Performance matters, even at small scales
- Complex systems have many points of failure, and even if you're sure it's perfect, there's probably something waiting to break
- People care more about the experience than the fancy tech
### What's Next
We have a lot of plans for this project. Here's what we want to do:
- Run UBC Hunt again
- Make a native app for a better player experience
- Bring our event to other universities to share the fun

I love working on this project and I'm so excited to keep growing what we've already started.

Thanks for reading!