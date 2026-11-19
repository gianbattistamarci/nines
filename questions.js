/* Nines: course content. Everything the player reads in a lesson or exam lives in this file.
   The game code is in game.js and never needs to change when you add or edit questions.

   HOW A QUESTION IS WRITTEN
   type "choice": q (the question), opts (answers). Mark the right answer with ok:1. Every wrong answer needs a why.
   type "sort":   q, buckets (two to four group names), items. Each item has t (text), b (group number, counting from 0) and why.
   type "order":  q, items (written in the correct order; the game shuffles them).
   Every question also has:
     point  one plain sentence with the thing to remember. Shown after every answer, right or wrong.
     ex     an everyday picture of the same idea. Shown under "Picture it".
   Exam questions also have from: the id of the lesson they test.

   HOW RANDOMISING WORKS
   Each entry in qs is one idea the lesson teaches. An entry is either a single question, or a list of
   questions in [ ... ] that all teach the same idea. On every play the game picks one question from each
   list, and avoids the one you saw last time. Lessons keep their order (easy to hard). Exams shuffle it.
   To make a lesson more varied, add another question to a list. Nothing else has to change.

   WRITING RULES
   1. One situation and one question. Three short sentences at most, and the last one is a real question.
   2. One way to write numbers: "98 out of 100", and from Stop 2.2 on also "98%". Never mix "worked" and "failed" counts or different totals in one question.
   3. Every question stands on its own. No "then", "so" or "too" that points at the question before it.
   4. Every wrong answer is a mistake a sensible person could make. No joke answers.
   5. Answers are about the same length. The right one must not be the longest.
   6. Plain words. No idioms a non-native reader has to look up. */

var NOTICE = ["A user would notice", "A user would not notice"];

var COURSE = [
 { n:1, title:"Does it work?", blurb:"What reliable means, seen from the user's side.", nodes:[

  /* ------------------------------------------------------------ 1.1 */
  { id:"l1-1", type:"lesson", code:"1.1", title:"It just works", sub:"6 questions. No experience needed.",
    intro:{ h:"Start here", p:"You never think about your banking app when it works. You only notice it on the day it lets you down. Reliability means software does what you expect, at the moment you need it. That is the whole subject. Let us warm up." },
    take:"Reliable means it does what people expect, when they need it, judged from their side.",
    qs:[
     { type:"choice", q:"You open your banking app. Your balance appears within a second. Is the app doing its job?",
       opts:[ {t:"Yes", ok:1},
              {t:"No", why:"It showed what you asked for, and quickly. That is what doing its job means."},
              {t:"Impossible to say", why:"You can say. You asked for your balance and you got it within a second."} ],
       point:"An app does its job when you get what you came for.",
       ex:"A light switch does its job when the light comes on. You do not need to see the wiring to know it worked." },

     { type:"choice", q:"You are paying with your phone in a shop. The payment screen keeps loading for two minutes. No error appears. Did the app work?",
       opts:[ {t:"No. You could not pay", ok:1},
              {t:"Yes. It never showed an error", why:"No error message is not the same as working. You still could not pay, and paying was the only thing you wanted."},
              {t:"Partly. It was still trying", why:"Trying does not pay for your shopping. In the shop you need it now, not in two minutes."} ],
       point:"Software is judged at the moment you need it.",
       ex:"An umbrella that opens perfectly at home but jams in the rain is not a good umbrella." },

     { type:"sort", q:"Is the app working for the person using it, or letting them down?", buckets:["Working","Letting them down"],
       items:[ {t:"A map app shows your route in two seconds", b:0, why:"Fast and correct. That is working."},
               {t:"A train app shows yesterday's timetable", b:1, why:"It opened without a problem, but the information is wrong. You would miss your train."},
               {t:"A video call freezes every ten seconds", b:1, why:"It is connected, but you cannot have a conversation."},
               {t:"An online shop takes your order and emails a confirmation", b:0, why:"You wanted to buy something and you did."} ],
       point:"Opening or being connected is not enough. The person has to get what they came for.",
       ex:"A taxi that arrives but drives you to the wrong address did not do its job." },

     { type:"choice", q:"You can count on an app to work every time you need it. Which word describes that app?",
       opts:[ {t:"Reliable", ok:1},
              {t:"Fast", why:"Speed is good, but a fast app that often fails is not one you can count on."},
              {t:"Popular", why:"Many users does not mean it works when you need it. Popular apps go down too."},
              {t:"Modern", why:"New things break too. Often more."} ],
       point:"Reliable means you can count on it. This whole course is about that one word.",
       ex:"Think of the friend who always arrives when they say they will. That friend is reliable." },

     { type:"choice", q:"True or false: an app with more features is a more reliable app.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"Features and reliability are different things. More features often means more things that can break."} ],
       point:"Reliability is about whether it works, not about how much it can do.",
       ex:"A pocket knife with twenty tools and a blade that snaps is worse than a plain knife that cuts." },

     { type:"choice", q:"A food delivery company says: 'Our system is running perfectly.' You ordered a pizza two hours ago. It never came. Who is right?",
       opts:[ {t:"You are. The customer's side is what counts", ok:1},
              {t:"The company is. They can see their systems", why:"Their systems can all be running while the pizza never arrives. Running is not the same as doing the job."},
              {t:"Both are, each in their own way", why:"It sounds fair, but a system that runs without delivering has failed. Only the customer's result counts."} ],
       point:"Whether it works is decided on the customer's side, not inside the company.",
       ex:"A restaurant kitchen can be clean and busy. If the food never reaches your table, dinner failed." }
    ]},

  /* ------------------------------------------------------------ 1.2 */
  { id:"l1-2", type:"lesson", code:"1.2", title:"Three ways to fail", sub:"6 questions. Errors, slowness, wrong answers.",
    intro:{ h:"Three ways to let you down", p:"Software can fail you in three ways. It can say no (an error). It can make you wait too long. Or it can give you the wrong answer. All three count as failing, even when nothing looks broken." },
    take:"Errors, slowness and wrong answers are all failures. What counts is what the user sees.",
    qs:[
     { type:"choice", q:"You try to book a cinema ticket. The site says: 'Something went wrong. Please try again later.' Which kind of failure is this?",
       opts:[ {t:"An error", ok:1},
              {t:"Too slow", why:"It answered quickly. The answer was just 'no'."},
              {t:"A wrong answer", why:"It gave you no answer at all. It refused. A wrong answer would be a ticket for the wrong film."} ],
       point:"An error is the app telling you 'no'. It is the easiest failure to see.",
       ex:"A shop with a 'closed' sign on the door at two in the afternoon. You know immediately that you will not be served." },

     { type:"choice", q:"A web page needs 40 seconds to open. You give up after 15 seconds and close it. Did the page work for you?",
       opts:[ {t:"No. Too slow counts as broken", ok:1},
              {t:"Yes. It would have opened in the end", why:"You had already left. A page that nobody waits for helps nobody."},
              {t:"Partly. Slow is better than an error", why:"Often it is worse. An error tells you immediately. Slowness wastes your time first."} ],
       point:"When people give up waiting, too slow is the same as broken.",
       ex:"A lift that takes twenty minutes to arrive is not out of order, but you will take the stairs." },

     { type:"choice", q:"Your weather app opens instantly, with no errors. It says: 'Sunny all day.' Outside it is raining hard. Did the app work?",
       opts:[ {t:"No. The answer was wrong", ok:1},
              {t:"Yes. It was fast", why:"Fast and wrong is still wrong. You left your coat at home."},
              {t:"Yes. There was no error", why:"Nothing warned you that the answer was wrong. That is what makes this kind of failure dangerous."} ],
       point:"A wrong answer is the quiet failure: no error, no waiting, and still you are let down.",
       ex:"A clock that has stopped still shows a time, with full confidence. It is just not the right time." },

     { type:"sort", q:"Which kind of failure is each of these?", buckets:["Error","Too slow","Wrong answer"],
       items:[ {t:"A login page says: 'Service unavailable'", b:0, why:"The site refused you. That is an error."},
               {t:"A photo takes five minutes to upload", b:1, why:"It works in the end, but far too late."},
               {t:"A calendar app shows your meeting on the wrong day", b:2, why:"No error and no waiting, but what it showed was not true."},
               {t:"A map app sends you to the wrong street", b:2, why:"It answered quickly and with confidence. The answer was simply wrong."} ],
       point:"Software fails in three ways: it says no, it makes you wait, or it tells you something wrong.",
       ex:"A waiter can say the kitchen is closed, bring your meal after two hours, or bring the wrong dish. Three ways to spoil dinner." },

     { type:"sort", q:"Four things happen at an online shop. Which would a shopper notice?", buckets:NOTICE,
       items:[ {t:"The 'Pay now' button does nothing", b:0, why:"The shopper cannot buy. They notice immediately."},
               {t:"One computer breaks and a spare takes over within a second", b:1, why:"The shop kept working. That is good design, and nobody outside saw a thing."},
               {t:"Search results take 30 seconds to appear", b:0, why:"Waiting half a minute for search results feels broken."},
               {t:"The shop's storage space is half full", b:1, why:"Half full is normal. Nothing has changed for the shopper."} ],
       point:"Not every problem behind the scenes is a failure. It becomes one when the user is affected.",
       ex:"In a theatre, someone can trip backstage and the audience never knows. If an actor forgets their lines, everyone knows." },

     { type:"choice", q:"You run a small online shop. What is the best way to know it is working?",
       opts:[ {t:"Check that people can actually buy things", ok:1},
              {t:"Check that the computers are switched on", why:"That tells you the lights are on, not that the door is open. Computers can run while buying fails."},
              {t:"Wait and see if customers complain", why:"By then customers have already been let down. Most of them leave without telling you."} ],
       point:"To know if it works, check the thing the user is trying to do.",
       ex:"A baker does not look at the oven light to know the bread is good. They taste the bread." }
    ]},

  /* ------------------------------------------------------------ 1.3
     Every idea in this lesson has two versions, so a replay is not a repeat.
     Checkpoint A has two versions for five of its ideas. All other stops have one version per idea so far. */
  { id:"l1-3", type:"lesson", code:"1.3", title:"Good enough", sub:"6 questions. Reliability as a number.",
    intro:{ h:"Nothing works every time", p:"Lifts get stuck. Trains run late. Apps fail now and then. So instead of asking 'does it work?', we count: out of 100 tries, how many worked? That number is how reliability is measured." },
    take:"Reliability is a number: how many tries out of 100 worked. The goal is enough, not perfect.",
    qs:[
     /* Idea 1: count the tries that worked */
     [ { type:"choice", q:"This week, people used the office coffee machine 100 times. It failed 2 times. How often did it work?",
         opts:[ {t:"98 out of 100", ok:1},
                {t:"2 out of 100", why:"That is how often it failed. It worked the other 98 times."},
                {t:"100 out of 100", why:"It failed twice, so not every time."} ],
         point:"Reliability is counted by the tries that worked: 98 out of 100.",
         ex:"A football player who scores 98 out of 100 penalties is described by the ones that went in." },
       { type:"choice", q:"Today, people used a parking ticket machine 100 times. It failed 5 times. How often did it work?",
         opts:[ {t:"95 out of 100", ok:1},
                {t:"5 out of 100", why:"That is how often it failed. It worked the other 95 times."},
                {t:"100 out of 100", why:"It failed five times, so not every time."} ],
         point:"Reliability is counted by the tries that worked: 95 out of 100.",
         ex:"A baker who burns 5 loaves out of 100 still sold 95 good ones. You count the good ones." } ],

     /* Idea 2: a number beats a feeling */
     [ { type:"choice", q:"Which sentence tells you the most about how reliable an app is?",
         opts:[ {t:"It works 99 out of 100 times", ok:1},
                {t:"It works pretty well most days", why:"'Pretty well' means something different to everyone. You cannot check it."},
                {t:"Most people seem to like it", why:"Liking an app and the app working are different things."} ],
         point:"A number can be checked and compared. A feeling cannot.",
         ex:"'The trains are usually fine' starts an argument. '93 out of 100 trains arrived on time' ends one." },
       { type:"choice", q:"Three people review the same app. Which review tells you the most about how reliable it is?",
         opts:[ {t:"It failed 3 out of 100 times", ok:1},
                {t:"Works great. Five stars from me", why:"Five stars for what? The looks, the price? It does not say how often the app works."},
                {t:"I never had a problem with it", why:"That is one person's luck. You do not know if they used it twice or two thousand times."} ],
         point:"A count of tries can be checked and compared. An impression cannot.",
         ex:"A doctor does not write 'feels warm' in your file. They write 38.5 degrees." } ],

     /* Idea 3: how reliable it must be depends on the harm */
     [ { type:"order", q:"Put these in order. Start with the one that must almost never fail.",
         items:["The emergency phone line","Paying by card in a shop","A photo filter app"],
         point:"The more harm a failure does, the more reliability is worth paying for.",
         ex:"A hospital has a backup generator. Your garden shed does not. Both choices are sensible." },
       { type:"order", q:"Put these in order. Start with the one that must almost never fail.",
         items:["An air traffic control system","A bank's cash machines","A recipe website"],
         point:"The more harm a failure does, the more reliability is worth paying for.",
         ex:"A plane has two engines and two pilots. A bicycle has one rider and no spare. Both choices are sensible." } ],

     /* Idea 4: "never fails" does not exist */
     [ { type:"choice", q:"A team says: 'Our music app must never fail. Not even once.' What is the problem with that goal?",
         opts:[ {t:"No software can promise 'never'", ok:1},
                {t:"There is no problem. Perfect is the right goal", why:"It sounds right, but nothing built by people works every single time. A goal nobody can reach helps nobody."},
                {t:"'Never' is only right for important apps", why:"Even a hospital system cannot promise never. Important systems get closer to perfect, at a much higher price."} ],
         point:"Perfect does not exist. And every step closer to it costs more than the step before.",
         ex:"A train company that is never late would need spare trains, spare drivers and spare track everywhere. Tickets would cost several times as much." },
       { type:"choice", q:"A manager asks: 'Can you guarantee that our website works 100% of the time?' What is the honest answer?",
         opts:[ {t:"No. Nobody can guarantee 100%", ok:1},
                {t:"Yes, if the team works hard enough", why:"Hard work cannot stop every power cut, broken cable or human mistake. Some failures are outside anyone's control."},
                {t:"Yes, if we buy the best equipment", why:"The best equipment still breaks, only less often. Each bit of extra certainty costs more, and 100% is never reached."} ],
         point:"100% does not exist. The honest question is: how close do we need to get?",
         ex:"No airline promises that every flight leaves on time. The weather alone makes that impossible." } ],

     /* Idea 5: users only feel the weakest part */
     [ { type:"choice", q:"Your home wifi cuts out about once a day. A video app gets an update: it used to crash once a month, now only once a year. At home, would you notice?",
         opts:[ {t:"No. The wifi still cuts out every day", ok:1},
                {t:"Yes. The app became twelve times better", why:"On paper, yes. But your video still stops once a day because of the wifi. That is what you feel."},
                {t:"Yes. Every improvement is noticeable", why:"Only when the app is the weakest part. Here the wifi is."} ],
         point:"You only feel the weakest part. Making the app better than your wifi changes nothing for you.",
         ex:"A chain breaks at its weakest link. Making the strongest link even stronger does not help." },
       { type:"choice", q:"An online shop's website fails about once a month. Its delivery company loses a parcel every day. The shop can pay to improve one of them. Which one?",
         opts:[ {t:"Delivery. Customers are let down there most", ok:1},
                {t:"The website. The shop built that part itself", why:"Customers do not care who built which part. A lost parcel feels like the shop failing them."},
                {t:"Both. Share the money equally", why:"Then half the money goes to a part that almost never fails. Customers would not feel that half."} ],
         point:"Improve the weakest part first. That is the one users feel.",
         ex:"A bucket with a large hole and a small hole: fix the large one first." } ],

     /* Idea 6: aim for enough */
     [ { type:"choice", q:"What is a sensible reliability goal for most software?",
         opts:[ {t:"Reliable enough to keep users happy", ok:1},
                {t:"Perfect, whatever it costs", why:"The cost is real: money, and time not spent making the product better. And users cannot feel the last small step."},
                {t:"As cheap as possible. Reliability can wait", why:"That goes too far the other way. If people cannot count on it, they leave."} ],
         point:"Aim for enough to keep users happy. Beyond that, extra reliability costs money that nobody feels.",
         ex:"You buy a good lock for your front door. You do not hire ten guards." },
       { type:"choice", q:"An app is already reliable enough: its users are happy. What is the best use of the team's time now?",
         opts:[ {t:"Build the things users are asking for", ok:1},
                {t:"Keep making it more reliable", why:"Users are already happy. They would not feel the difference, but they would miss the things you did not build."},
                {t:"Remove features so that less can break", why:"Users are happy with what they have. Taking features away lets them down in a different way."} ],
         point:"Once it is reliable enough, extra effort is better spent on something users will feel.",
         ex:"When the roof no longer leaks, you paint the walls. You do not build a second roof." } ]
    ]},

  /* ------------------------------------------------------------ Checkpoint A */
  { id:"x-a", type:"exam", code:"A", title:"Checkpoint A", sub:"10 questions. Pass mark 80%. Earns the rank Observer.", pass:80,
    intro:{ h:"Checkpoint A", p:"Ten questions on everything so far. No second tries this time, but you still get the explanation after each answer. You need 8 out of 10 to pass. Notice the pass mark is not 10 out of 10. Good enough is the point." },
    qs:[
     [ { from:"l1-2", type:"choice", q:"A parcel app says 'Delivered'. There is no parcel at your door. What kind of failure is this?",
         opts:[ {t:"A wrong answer", ok:1},
                {t:"Too slow", why:"The app answered immediately. The answer was just not true."},
                {t:"An error", why:"There was no error message. It told you something wrong, with full confidence."} ],
         point:"No error and no waiting, but what the app told you was not true.",
         ex:"A navigation app that calmly says 'you have arrived' in the middle of a field." },
       { from:"l1-2", type:"choice", q:"A fitness app says you walked 2,000 steps today. You walked all day and know it was far more. What kind of failure is this?",
         opts:[ {t:"A wrong answer", ok:1},
                {t:"Too slow", why:"The app showed a number immediately. The number was just not true."},
                {t:"An error", why:"There was no error message. It showed you a wrong number, with full confidence."} ],
         point:"No error and no waiting, but what the app told you was not true.",
         ex:"Bathroom scales that always show two kilos less. Pleasant, but wrong." } ],

     { from:"l1-1", type:"choice", q:"A team has screens that show the health of its systems. Everything is green. Meanwhile, customers call to say they cannot log in. Is something broken?",
       opts:[ {t:"Yes. Customers cannot log in, and that counts", ok:1},
              {t:"No. The screens show no problems", why:"The screens only show what somebody decided to measure. The customers are showing you what was missed."},
              {t:"Probably not. The customers made a mistake", why:"One customer, maybe. Many at the same time means the problem is on your side."} ],
       point:"When the screens and the customers disagree, believe the customers.",
       ex:"A pilot whose instruments say all is well, while passengers can see smoke from the window, should look out of the window." },

     [ { from:"l1-3", type:"choice", q:"A chat app sent 1,000 messages. 995 arrived. How often did it work?",
         opts:[ {t:"995 out of 1,000", ok:1},
                {t:"5 out of 1,000", why:"That is how many got lost. The other 995 arrived."},
                {t:"1,000 out of 1,000", why:"Five messages never arrived, so it was not every time."} ],
         point:"Count the tries that worked: 995 out of 1,000.",
         ex:"A postman who delivers 995 out of 1,000 letters does good work. Five people are still waiting." },
       { from:"l1-3", type:"choice", q:"This month, people used a cash machine 1,000 times. It failed 8 times. How often did it work?",
         opts:[ {t:"992 out of 1,000", ok:1},
                {t:"8 out of 1,000", why:"That is how often it failed. It worked the other 992 times."},
                {t:"1,000 out of 1,000", why:"It failed eight times, so not every time."} ],
         point:"Count the tries that worked: 992 out of 1,000.",
         ex:"A goalkeeper who stops 992 out of 1,000 shots is judged by the ones that were stopped." } ],

     { from:"l1-2", type:"sort", q:"A streaming service has a busy evening. Which of these would a viewer notice?", buckets:NOTICE,
       items:[ {t:"The film stops every minute to load", b:0, why:"Constant pauses ruin the film."},
               {t:"A backup machine takes over in one second", b:1, why:"The viewer saw nothing. The backup did its job."},
               {t:"The 'Play' button shows an error", b:0, why:"They cannot watch at all."},
               {t:"An engineer removes old files", b:1, why:"Cleaning up behind the scenes changes nothing on screen."} ],
       point:"For the viewer, only what reaches the screen counts as a failure.",
       ex:"Hotel guests notice a cold shower. They do not notice the plumber who repaired a spare pump at three in the morning." },

     { from:"l1-2", type:"choice", q:"True or false: a page that is far too slow can be just as bad as a page that is broken.",
       opts:[ {t:"True", ok:1},
              {t:"False", why:"If you give up before it finishes, the result for you is the same. You did not get what you came for."} ],
       point:"If you give up before it finishes, slow and broken give the same result.",
       ex:"A waiter who brings your meal after two hours has not really served you dinner." },

     [ { from:"l1-3", type:"choice", q:"Which goal is the most sensible for a taxi app?",
         opts:[ {t:"At least 999 out of 1,000 rides work", ok:1},
                {t:"No ride ever fails", why:"'Ever' cannot be promised. One lost phone signal breaks it."},
                {t:"Ride requests work most of the time", why:"'Most' could mean 51 out of 100 or 99 out of 100. Nobody can check it."} ],
         point:"A good goal is a number that can be reached and can be checked.",
         ex:"A good goal is like a speed limit: a clear number everyone can see and measure." },
       { from:"l1-3", type:"choice", q:"Which goal is the most sensible for a food delivery app?",
         opts:[ {t:"At least 98 out of 100 orders are on time", ok:1},
                {t:"No order ever arrives late", why:"'Ever' cannot be promised. One traffic jam breaks it."},
                {t:"Orders arrive on time most of the time", why:"'Most' could mean 51 out of 100 or 99 out of 100. Nobody can check it."} ],
         point:"A good goal is a number that can be reached and can be checked.",
         ex:"A good goal is like a pass mark: a clear number, known before the exam starts." } ],

     [ { from:"l1-3", type:"order", q:"Put these in order. Start with the one that must almost never fail.",
         items:["A hospital heart monitor","A supermarket's online checkout","A game's list of top scores"],
         point:"Match the reliability to the harm a failure would do.",
         ex:"You insure a house for more than a bicycle. Protection should match what is at stake." },
       { from:"l1-3", type:"order", q:"Put these in order. Start with the one that must almost never fail.",
         items:["A fire alarm system","A train ticket machine","A music playlist app"],
         point:"Match the reliability to the harm a failure would do.",
         ex:"You insure a house for more than a bicycle. Protection should match what is at stake." } ],

     [ { from:"l1-1", type:"choice", q:"An app added 50 new features this year. It also crashes every morning at nine. Is it reliable?",
         opts:[ {t:"No. It fails when people need it", ok:1},
                {t:"Yes. It keeps improving", why:"New features do not make up for failing every morning. Nobody can use a feature in an app that is down."},
                {t:"Yes, apart from the mornings", why:"Mornings are when people use it. Reliable only when nobody is looking is not reliable."} ],
         point:"Reliable means it works when people need it. Features do not make up for that.",
         ex:"A bakery with fifty kinds of bread that is closed at breakfast time." },
       { from:"l1-1", type:"choice", q:"A streaming app has the largest film collection of all. It also stops working most Friday evenings. Is it reliable?",
         opts:[ {t:"No. It fails when people need it", ok:1},
                {t:"Yes. No other app offers more", why:"A large collection is of no use on an evening when nothing plays."},
                {t:"Yes, on the other six days", why:"Friday evening is when people want it most. Reliable only at quiet times is not reliable."} ],
         point:"Reliable means it works when people need it. A large offer does not make up for that.",
         ex:"A restaurant with a long menu that closes at dinner time." } ],

     { from:"l1-2", type:"choice", q:"You are in charge of a video call app. What tells you best whether it is working?",
       opts:[ {t:"How many calls connect and stay clear", ok:1},
              {t:"How many computers are switched on", why:"Computers can be on while calls fail. That measures your equipment, not your users' experience."},
              {t:"How few complaints come in", why:"Most people who are let down never complain. They just stop using the app."} ],
       point:"Check the thing the user is trying to do. Here: having a clear call.",
       ex:"A restaurant counts happy tables, not how many ovens it owns." },

     { from:"l1-3", type:"choice", q:"A shop took 200 card payments today. 4 failed. The manager says: 'We need zero failures.' What is the best reply?",
       opts:[ {t:"First, let us agree what is good enough", ok:1},
              {t:"Agreed. Zero failures from now on", why:"Zero forever cannot be promised. Cards get declined and phones lose signal."},
              {t:"4 is very few. We can ignore it", why:"Maybe, maybe not. Without an agreed number, nobody knows whether 196 out of 200 is good or bad."} ],
       point:"Without an agreed target, nobody can say whether a result is good or bad.",
       ex:"Before arguing about whether the train service is good, agree what good means: say, 95 out of 100 on time. Then the number settles it." }
    ]}
 ]},

 { n:2, title:"Set a target", blurb:"The two terms engineers use every day: the number you measure and the number you aim for.", nodes:[

  /* ------------------------------------------------------------ 2.1 */
  { id:"l2-1", type:"lesson", code:"2.1", title:"Measure, then aim", sub:"6 questions. Your first real SRE terms.",
    intro:{ h:"Two numbers", p:"You know reliability is a number. Now for the two terms engineers use every day. The number you measure is called an indicator. The number you aim for is called an objective. Measure first, then aim." },
    take:"SLI: the number you measure. SLO: the number you aim for. Compare them to know where you stand.",
    qs:[
     { type:"choice", q:"A train company counts how many trains arrive on time. Last month: 93 out of 100. What kind of number is 93?",
       opts:[ {t:"A measurement of last month", ok:1},
              {t:"A promise to passengers", why:"Nobody promised 93. It is simply what happened last month."},
              {t:"A goal for next month", why:"A goal looks forward. This number looks back."} ],
       point:"A measurement looks back. It tells you what really happened.",
       ex:"Stepping on the scales gives you a measurement. What you want to weigh is a different number." },

     { type:"choice", q:"A train company decides: 'We want at least 95 out of 100 trains on time.' What kind of number is 95?",
       opts:[ {t:"A target to aim for", ok:1},
              {t:"A measurement of what happened", why:"Nothing has been measured here. This is what they want, not what they got."},
              {t:"A forecast of what will happen", why:"A forecast is a guess about the future. This is a choice: the level the company wants to reach."} ],
       point:"A target looks forward. It is the level you choose to aim for.",
       ex:"The scales show 82 kilos: a measurement. 'I want to be 78' is a target. You need both to know how you are doing." },

     { type:"choice", q:"Engineers call the measurement an SLI: a service level indicator. Which of these is an SLI?",
       opts:[ {t:"97 out of 100 logins worked last week", ok:1},
              {t:"99 out of 100 logins should work", why:"'Should' gives it away. That is a target, not a measurement."},
              {t:"Logins are working without problems", why:"That is an opinion. An indicator is a number that was measured."} ],
       point:"SLI: a measured number that shows how well the service worked.",
       ex:"The speedometer in a car is an indicator. It tells you what is happening." },

     { type:"choice", q:"Engineers call the target an SLO: a service level objective. Which of these is an SLO?",
       opts:[ {t:"99 out of 100 payments should go through", ok:1},
              {t:"98 out of 100 payments went through yesterday", why:"That is what happened. It is a measurement, so an indicator."},
              {t:"Payments are very important to us", why:"True, but there is no number in it. An objective needs a number you can check."} ],
       point:"SLO: the number you aim for. It always says what should happen.",
       ex:"The speed limit sign is the objective. The speedometer is the indicator. You compare one with the other." },

     { type:"sort", q:"Is it an indicator or an objective?", buckets:["Indicator (measured)","Objective (aimed for)"],
       items:[ {t:"90 out of 100 pages opened within two seconds yesterday", b:0, why:"It describes yesterday. That is a measurement."},
               {t:"95 out of 100 pages should open within two seconds", b:1, why:"'Should' makes it a target."},
               {t:"999 out of 1,000 messages arrived last month", b:0, why:"It already happened, so it is a measurement."},
               {t:"At least 99 out of 100 video calls should connect", b:1, why:"It says what the team aims for."} ],
       point:"Something that happened is an indicator. Something that should happen is an objective.",
       ex:"A school report shows the marks you got. The pass mark is what you needed. Indicator, objective." },

     { type:"choice", q:"The objective: 99 out of 100 payments go through. This week: 97 out of 100. What should the team do?",
       opts:[ {t:"Improve reliability first", ok:1},
              {t:"Nothing. 97 is a high number", why:"High compared with what? The agreed target is 99, and 97 is below it."},
              {t:"Lower the objective to 97", why:"That hides the problem. The target was chosen for the users, and they are getting less."} ],
       point:"Compare the indicator with the objective. Below the target means reliability comes first.",
       ex:"If the pass mark is 80 and you score 70, you study more. You do not ask the teacher to lower the pass mark." }
    ]},

  /* ------------------------------------------------------------ 2.2 */
  { id:"l2-2", type:"lesson", code:"2.2", title:"Why not 100%", sub:"6 questions. Percentages, nines and the price of perfect.",
    intro:{ h:"The last step costs the most", p:"So far we wrote '99 out of 100'. Engineers write that as 99%, and from here on so do we. You might think the best objective is 100%. It is not. This stop shows why." },
    take:"100% is the wrong target. Each extra nine costs far more, and users stop feeling the difference.",
    qs:[
     { type:"choice", q:"An app works 99 out of 100 times. How do engineers write that?",
       opts:[ {t:"99%", ok:1},
              {t:"1%", why:"That is the share that failed. Reliability is written as the share that worked."},
              {t:"100%", why:"It failed 1 time out of 100, so it is not 100%."} ],
       point:"99 out of 100 is 99%. The same number, shorter to write.",
       ex:"A shop sign says '20% off'. Nobody writes '20 euros off for every 100 euros'." },

     { type:"choice", q:"Engineers count the nines in a number. 99% is called 'two nines'. What is 99.9% called?",
       opts:[ {t:"Three nines", ok:1},
              {t:"Two nines", why:"99% has two. 99.9% has one more nine after the point."},
              {t:"Four nines", why:"That would be 99.99%. Count the nines: here there are three."} ],
       point:"Each extra nine means ten times fewer failures. 99% fails 1 out of 100 times, 99.9% fails 1 out of 1,000 times.",
       ex:"This is where the name of this game comes from." },

     { type:"order", q:"Put these targets in order. Start with the one that allows the fewest failures.",
       items:["99.99%","99.9%","99%","90%"],
       point:"More nines means fewer failures allowed.",
       ex:"A finer and finer fishing net: each one lets fewer fish escape." },

     { type:"choice", q:"A team moves its app from 99% to 99.9%. What usually happens to the cost of running it?",
       opts:[ {t:"It goes up a lot", ok:1},
              {t:"It stays about the same", why:"Fewer failures needs spare machines, more testing and more people on watch. None of that is free."},
              {t:"It goes down", why:"A more reliable app has fewer incidents, but getting there takes far more equipment and work."} ],
       point:"Each extra nine costs much more than the one before.",
       ex:"A beginner can run a marathon 10 minutes faster with some training. A top runner trains for years to win 10 seconds." },

     { type:"choice", q:"A phone app runs over a mobile network that works about 99% of the time. The app itself moves from 99.99% to 99.999%. Would its users feel the difference?",
       opts:[ {t:"No. The network fails far more often", ok:1},
              {t:"Yes. The app fails ten times less", why:"True on paper. But users reach the app through a network that fails far more often than the app does."},
              {t:"Yes. Users always feel improvements", why:"Only when the improved part is the weakest part. Here the network is."} ],
       point:"Beyond a certain level, more nines cost money and nobody feels them.",
       ex:"A faster car does not shorten your trip when every road has a traffic jam." },

     { type:"choice", q:"A team is told: 'No failure is allowed, ever.' What happens to new features?",
       opts:[ {t:"They slow down. Every change is a risk", ok:1},
              {t:"They speed up. Stable apps are easy to change", why:"With no failure allowed, every change must be checked again and again. That makes change slow, not fast."},
              {t:"Nothing changes for new features", why:"Every new feature can break something. If nothing may ever break, almost nothing may change."} ],
       point:"Perfect reliability means almost no change. And users want new things too.",
       ex:"A museum piece is never damaged because nobody may touch it. An app that nobody may touch does not get better." }
    ]},

  /* ------------------------------------------------------------ 2.3 */
  { id:"l2-3", type:"lesson", code:"2.3", title:"The error budget", sub:"6 questions. How much failure is allowed.",
    intro:{ h:"Room to fail", p:"If the objective is 99%, then 1% may fail. That 1% is not a shame. It is an allowance, agreed in advance. Engineers call it the error budget." },
    take:"Error budget: 100% minus the objective. It is the amount of failure you are allowed to have.",
    qs:[
     { type:"choice", q:"The objective is 99%. What share of tries is allowed to fail?",
       opts:[ {t:"1%", ok:1},
              {t:"99%", why:"That is the share that must work."},
              {t:"0%", why:"0% would mean an objective of 100%. The objective here is 99%."} ],
       point:"What the objective leaves over may fail: 100% minus 99% is 1%.",
       ex:"A pass mark of 80% means you may get 20% wrong and still pass." },

     { type:"choice", q:"Engineers call the allowed share of failures the error budget. A service has an objective of 99.9%. What is its error budget?",
       opts:[ {t:"0.1%", ok:1},
              {t:"99.9%", why:"That is the objective itself: the share that must work. The budget is what is left."},
              {t:"1%", why:"1% belongs to an objective of 99%. Here: 100% minus 99.9% is 0.1%."} ],
       point:"Error budget = 100% minus the objective.",
       ex:"A phone plan with 10 GB of data a month. The budget is what you may use before there is a problem." },

     { type:"choice", q:"This month an app is used 1,000 times. The objective is 99%. How many of those tries may fail?",
       opts:[ {t:"10", ok:1},
              {t:"1", why:"1% of 1,000 is 10, not 1. One out of 100 may fail, and there are ten hundreds."},
              {t:"100", why:"100 would be 10% of the tries. The budget is 1%."} ],
       point:"The budget becomes a real number of failures: 1% of 1,000 is 10.",
       ex:"A coffee budget of 30 euros a month. You can count exactly how many cups that is." },

     { type:"choice", q:"The error budget for this month is 10 failed tries. So far 4 tries have failed. How much budget is left?",
       opts:[ {t:"6 failures", ok:1},
              {t:"4 failures", why:"4 is what has been used. 10 minus 4 leaves 6."},
              {t:"10 failures", why:"The budget started at 10, but 4 are already used."} ],
       point:"Every failure spends some budget. What is left is what you can still afford.",
       ex:"A prepaid card with 10 euros on it. After spending 4, you have 6 left." },

     { type:"choice", q:"True or false: using some of the error budget means the team did something wrong.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"The budget exists to be used. Failures inside it were agreed in advance as acceptable."} ],
       point:"Failures inside the budget are expected and accepted. That is the whole idea.",
       ex:"Using 8 GB of a 10 GB data plan is not a mistake. It is what the plan is for." },

     { type:"sort", q:"The objective is 99%. Is each month inside the budget or over it?", buckets:["Inside the budget","Over the budget"],
       items:[ {t:"99.5% of tries worked", b:0, why:"0.5% failed. The budget allows 1%."},
               {t:"98% of tries worked", b:1, why:"2% failed. That is twice the budget."},
               {t:"99% of tries worked", b:0, why:"Exactly 1% failed. The budget is used up, but not passed."},
               {t:"97.5% of tries worked", b:1, why:"2.5% failed, far more than the 1% allowed."} ],
       point:"Compare what failed with what was allowed to fail.",
       ex:"The speed limit is 100. At 98 you are fine. At 104 you are not." }
    ]},

  /* ------------------------------------------------------------ 2.4 */
  { id:"l2-4", type:"lesson", code:"2.4", title:"Spend it or save it", sub:"6 questions. What to do with the budget.",
    intro:{ h:"A budget is for spending", p:"New features bring risk: every change can break something. The error budget tells a team how much risk it can still take. Budget left: go ahead and change things. Budget gone: slow down and repair." },
    take:"Budget left: release new things. Budget gone: stop and make it more reliable. The number decides, not the loudest voice.",
    qs:[
     { type:"choice", q:"It is halfway through the month. The team has used very little of its error budget. What does that allow?",
       opts:[ {t:"Releasing new features with some risk", ok:1},
              {t:"Nothing. The budget must be saved", why:"A budget that is never used is wasted. Users could have had new features sooner."},
              {t:"Lowering the objective for next month", why:"The objective is chosen for the users. Unused budget is a reason to move faster, not to promise less."} ],
       point:"Budget left means there is room to take risks, such as new releases.",
       ex:"Money left at the end of the month can be spent on something nice. That is what it is for." },

     { type:"choice", q:"The error budget for this month is used up. There are ten days left. What should the team do?",
       opts:[ {t:"Pause new features, fix reliability", ok:1},
              {t:"Continue with the plan as it is", why:"Every new change adds risk, and there is no room left for failures this month."},
              {t:"Raise the budget so work can go on", why:"That hides the problem. Users are already getting less than was agreed."} ],
       point:"Budget gone means: stop adding risk and repair first.",
       ex:"When your data plan is used up before the end of the month, you stop watching videos on the train." },

     { type:"choice", q:"Developers want to release a new feature today. The operations team says it is too risky. What settles the argument fairly?",
       opts:[ {t:"The error budget that is left", ok:1},
              {t:"The most senior person present", why:"Then the decision depends on who is in the room, not on what users experience."},
              {t:"The team that asked first", why:"Asking first says nothing about risk. A number that both teams agreed on does."} ],
       point:"The error budget is a rule both sides agreed on in advance. The number decides, not opinions.",
       ex:"Two children share a cake more calmly when the rule was agreed before the cake arrived." },

     { type:"sort", q:"Does this use up error budget?", buckets:["Uses budget","Does not use budget"],
       items:[ {t:"A release goes wrong and logins fail for an hour", b:0, why:"Users were let down. That counts against the budget."},
               {t:"A planned maintenance stop that users notice", b:0, why:"Users could not use the service. For them it makes no difference that it was planned."},
               {t:"A spare machine breaks and nobody notices", b:1, why:"Users were not affected, so no budget is used."},
               {t:"The team spends a day writing documentation", b:1, why:"No user was let down. The budget only counts failures that users feel."} ],
       point:"Anything that lets users down uses budget. It does not matter why it happened.",
       ex:"Your data plan does not care whether you watched a film or updated your phone. Used is used." },

     { type:"choice", q:"A team finishes every month with its whole error budget unused. What does that suggest?",
       opts:[ {t:"They could release faster", ok:1},
              {t:"They are doing everything right", why:"Maybe. But unused budget also means risks not taken: features that users had to wait for."},
              {t:"The objective should be 100%", why:"100% leaves no budget at all, so no change could ever be made. Unused budget is room to move faster."} ],
       point:"A budget that is never touched means the team is more careful than its users need.",
       ex:"If you always arrive at the airport five hours early, you never miss a flight. You also lose a lot of time." },

     { type:"order", q:"The error budget runs out. Put the team's steps in a sensible order.",
       items:["Pause risky releases","Find what used the budget","Fix the biggest cause","Start releasing again"],
       point:"Stop adding risk, understand, repair, then continue.",
       ex:"A leaking boat: stop loading cargo, find the hole, repair it, then sail on." }
    ]},

  /* ------------------------------------------------------------ Checkpoint B */
  { id:"x-b", type:"exam", code:"B", title:"Checkpoint B", sub:"10 questions. Pass mark 80%. Earns the rank Planner.", pass:80,
    intro:{ h:"Checkpoint B", p:"Ten questions on targets and budgets. No second tries, but you still get the explanation after each answer. You need 8 out of 10 to pass." },
    qs:[
     { from:"l2-1", type:"choice", q:"Last week, 96% of video calls connected. What kind of number is that?",
       opts:[ {t:"An indicator (SLI)", ok:1},
              {t:"An objective (SLO)", why:"An objective says what should happen. This says what did happen."},
              {t:"An error budget", why:"The budget is the share that may fail. This is the share that worked."} ],
       point:"What was measured is the indicator.",
       ex:"The reading on the thermometer, not the temperature you would like." },

     { from:"l2-1", type:"choice", q:"'At least 99% of searches should answer within one second.' What is this?",
       opts:[ {t:"An objective (SLO)", ok:1},
              {t:"An indicator (SLI)", why:"'Should' gives it away. It is a target, not a measurement."},
              {t:"A measurement of last month", why:"Nothing was measured here. It says what the team aims for."} ],
       point:"A target with a number you can check is an objective.",
       ex:"The finish time a runner trains for, not the time on the clock today." },

     { from:"l2-2", type:"choice", q:"Which target allows the fewest failures?",
       opts:[ {t:"99.99%", ok:1},
              {t:"99.9%", why:"99.9% allows ten times more failures than 99.99%."},
              {t:"99%", why:"99% allows a hundred times more failures than 99.99%."} ],
       point:"More nines, fewer failures allowed.",
       ex:"Four nines: 1 failure out of 10,000 tries. Two nines: 100 failures out of 10,000 tries." },

     { from:"l2-2", type:"choice", q:"True or false: the best objective for any service is 100%.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"100% cannot be reached, costs far too much to chase, and leaves no room for any change."} ],
       point:"100% is the wrong target for almost everything.",
       ex:"No airline promises that every flight leaves on time." },

     { from:"l2-3", type:"choice", q:"The objective is 99.5%. What is the error budget?",
       opts:[ {t:"0.5%", ok:1},
              {t:"99.5%", why:"That is the objective itself. The budget is what is left: 100% minus 99.5%."},
              {t:"5%", why:"100% minus 99.5% is 0.5%, not 5%."} ],
       point:"Error budget = 100% minus the objective.",
       ex:"A pass mark of 99.5% leaves half a percent for mistakes." },

     { from:"l2-3", type:"choice", q:"This month an app is used 10,000 times. The objective is 99%. How many tries may fail?",
       opts:[ {t:"100", ok:1},
              {t:"10", why:"1% of 10,000 is 100. Ten would be 0.1%."},
              {t:"1,000", why:"That would be 10%. The budget is 1%."} ],
       point:"1% of 10,000 is 100. The budget is a real number of failures.",
       ex:"One out of 100 seats in a hall of 10,000 seats: that is 100 seats." },

     { from:"l2-3", type:"sort", q:"The objective is 99.9%. Is each month inside the budget or over it?", buckets:["Inside the budget","Over the budget"],
       items:[ {t:"99.95% of tries worked", b:0, why:"0.05% failed. The budget allows 0.1%."},
               {t:"99.5% of tries worked", b:1, why:"0.5% failed. That is five times the budget of 0.1%."},
               {t:"99.9% of tries worked", b:0, why:"Exactly 0.1% failed. The budget is used up, but not passed."},
               {t:"99% of tries worked", b:1, why:"1% failed. That is ten times the budget of 0.1%."} ],
       point:"Compare what failed with what was allowed to fail.",
       ex:"The luggage limit is 23 kilos. A bag of 22.5 passes. A bag of 25 does not." },

     { from:"l2-4", type:"choice", q:"The error budget is used up with two weeks left in the month. What comes first now?",
       opts:[ {t:"Reliability work", ok:1},
              {t:"The planned features", why:"Every new feature adds risk, and there is no room left for failures."},
              {t:"A bigger error budget", why:"That hides the problem. Users are already getting less than was agreed."} ],
       point:"Budget gone: repair first, new things later.",
       ex:"When the fuel light is on, you drive to the petrol station, not to the beach." },

     { from:"l2-4", type:"choice", q:"Near the end of the month, a team still has most of its error budget. What is a good use of it?",
       opts:[ {t:"Try a risky but useful release", ok:1},
              {t:"Save it for next month", why:"The budget starts fresh each period. What is not used is lost, and so is the chance to move faster."},
              {t:"Announce a higher objective", why:"One good month is no reason to promise more. The budget is there to be used for progress."} ],
       point:"Unused budget is room to take a useful risk.",
       ex:"Holiday days that expire at the end of the year are best taken." },

     { from:"l2-4", type:"choice", q:"Developers and operators disagree about a release. Both agreed earlier to follow the error budget. There is budget left. What happens?",
       opts:[ {t:"The release goes ahead", ok:1},
              {t:"Operators can still block it", why:"Then the budget means nothing. The agreement was: budget left means releases may go ahead."},
              {t:"The teams vote on it", why:"A vote brings opinions back in. The agreed number already gives the answer."} ],
       point:"The agreed number decides. That is what makes the budget work.",
       ex:"A referee uses the rule book, not the volume of the crowd." }
    ]}
 ]},

 { n:3, title:"Watching the system", blurb:"What to look at to know how a service is doing.", nodes:[

  /* ------------------------------------------------------------ 3.1 */
  { id:"l3-1", type:"lesson", code:"3.1", title:"Four things to watch", sub:"6 questions. The four signals.",
    intro:{ h:"You cannot fix what you cannot see", p:"To keep a service reliable, you have to watch it. Watching a running system is called monitoring. There is far too much to look at, so engineers start with four signals: how slow, how busy, how many errors, and how full." },
    take:"The four signals: how slow (latency), how busy (traffic), how many errors, how full (saturation).",
    qs:[
     { type:"choice", q:"Watching a running system to see how it is doing has a name. What is it called?",
       opts:[ {t:"Monitoring", ok:1},
              {t:"Testing", why:"Testing checks software before it goes live. Monitoring watches it while people use it."},
              {t:"Planning", why:"Planning looks ahead. Monitoring looks at what is happening right now."} ],
       point:"Monitoring: watching a live system to see how it is doing.",
       ex:"A car dashboard shows speed, fuel and temperature while you drive." },

     { type:"choice", q:"An online shop measures how long each page takes to open. Engineers call this latency. Which signal is it?",
       opts:[ {t:"How slow", ok:1},
              {t:"How busy", why:"Busy is about how many visitors there are. This is about how long each one waits."},
              {t:"How full", why:"Full is about space that is running out. This is about waiting time."} ],
       point:"Latency: how long a user waits for an answer.",
       ex:"In a restaurant: the time between ordering and eating." },

     { type:"choice", q:"A ticket site normally gets 100 visitors a minute. Tonight it gets 5,000 a minute. Which signal changed first?",
       opts:[ {t:"How busy (traffic)", ok:1},
              {t:"How slow (latency)", why:"The site may get slow as a result. But what changed first is the number of visitors."},
              {t:"How many errors", why:"Errors may follow. But what changed first is the number of visitors."} ],
       point:"Traffic: how much the service is being asked to do.",
       ex:"The number of cars on a motorway. It tells you what to expect next." },

     { type:"choice", q:"A server's storage is 95% full and still growing. Engineers call this saturation. Why is it worth watching?",
       opts:[ {t:"It warns before something runs out", ok:1},
              {t:"It shows how many users are unhappy", why:"Nobody is unhappy yet. That is the value of this signal: it warns before users are let down."},
              {t:"It shows how fast the pages open", why:"That is latency. Saturation shows how close something is to its limit."} ],
       point:"Saturation: how full the system is. It is the early warning.",
       ex:"A fuel gauge. You look at it before the car stops, not after." },

     { type:"sort", q:"Which signal is each of these?", buckets:["Slow","Busy","Errors","Full"],
       items:[ {t:"Pages take 8 seconds to open", b:0, why:"Waiting time is about how slow the service is."},
               {t:"Twice as many visitors as this morning", b:1, why:"The number of visitors is about how busy it is."},
               {t:"1 out of 20 payments is refused", b:2, why:"Refused payments are errors."},
               {t:"The disk is 98% full", b:3, why:"Space that is running out is about how full it is."} ],
       point:"Slow, busy, errors, full: with these four you see most problems coming.",
       ex:"A doctor starts with pulse, temperature, blood pressure and breathing. Four numbers already tell a lot." },

     { type:"choice", q:"A new service gets a screen with only four numbers on it. Which four make the best start?",
       opts:[ {t:"Waiting time, visitors, errors, how full", ok:1},
              {t:"Servers, team size, costs, software age", why:"Those describe the organisation. They do not show how the service is doing for users right now."},
              {t:"Lines of code, features, releases, bugs", why:"Those describe the software project. They do not show what users experience right now."} ],
       point:"Start with the four signals. Add more only when you need them.",
       ex:"A new driver learns to read speed and fuel first, not the oil pressure." }
    ]},

  /* ------------------------------------------------------------ 3.2 */
  { id:"l3-2", type:"lesson", code:"3.2", title:"Symptoms and causes", sub:"6 questions. What users feel, and why.",
    intro:{ h:"What hurts, and why", p:"A symptom is what the user feels: the page is slow, the payment fails. A cause is the reason behind it: a full disk, a broken cable. Good monitoring shows the symptom first, then helps you find the cause." },
    take:"Symptom: what users feel. Cause: why it happens. Watch symptoms first, then look for causes.",
    qs:[
     { type:"choice", q:"Customers cannot log in. The reason: the database, where all accounts are stored, is overloaded. Which part is the symptom?",
       opts:[ {t:"Customers cannot log in", ok:1},
              {t:"The database is overloaded", why:"That is the cause: the reason behind the problem. The symptom is what the user feels."},
              {t:"Both are symptoms", why:"Users feel only one of them. The overloaded database is the reason behind it."} ],
       point:"The symptom is what the user feels.",
       ex:"A fever is the symptom. The infection is the cause." },

     { type:"sort", q:"Is it a symptom or a cause?", buckets:["Symptom","Cause"],
       items:[ {t:"Videos keep stopping", b:0, why:"A user sees and feels this. That makes it a symptom."},
               {t:"A network cable is damaged", b:1, why:"Users do not see the cable. It is a reason behind what they feel."},
               {t:"The checkout page shows an error", b:0, why:"The customer sees this directly."},
               {t:"A server has run out of memory", b:1, why:"No user sees the memory. It explains why something else fails."} ],
       point:"Ask: would a user say this sentence? Then it is a symptom.",
       ex:"'My head hurts' is a symptom. 'You have not drunk water all day' is a cause." },

     { type:"choice", q:"Why should monitoring look at symptoms first?",
       opts:[ {t:"They show users are affected", ok:1},
              {t:"Causes are not important", why:"Causes matter a lot: you need them for the repair. But first you must know that users are affected."},
              {t:"Symptoms are easier to repair", why:"You repair causes, not symptoms. Symptoms tell you that there is something to repair."} ],
       point:"A cause without a symptom may not matter. A symptom always matters.",
       ex:"A doctor first asks 'where does it hurt?' and only then orders tests." },

     { type:"choice", q:"A shop website is checked in two ways. A: a test visitor tries to buy something every minute. B: the team reads numbers from inside the servers. What does only A show?",
       opts:[ {t:"What a customer experiences", ok:1},
              {t:"Why something is broken", why:"The numbers from inside are for that. The test visitor only shows that something is wrong."},
              {t:"How full the disks are", why:"A test visitor cannot see inside the machines. It only sees what a customer sees."} ],
       point:"Check from the outside to see what users see. Look inside to find out why.",
       ex:"A restaurant owner can eat as a guest, or look into the kitchen. The first shows what guests get. The second shows why." },

     { type:"choice", q:"A team builds a screen with 200 graphs for one service. What is the risk?",
       opts:[ {t:"The important signal gets lost", ok:1},
              {t:"None. More data is always better", why:"During an incident, nobody can read 200 graphs. What matters gets lost between what does not."},
              {t:"The graphs slow the service down", why:"Graphs only show numbers. The risk is for the people who must find the important one in a hurry."} ],
       point:"Show few things, and make them the ones that matter.",
       ex:"A car dashboard shows speed, fuel and warnings. It does not show the pressure in every pipe." },

     { type:"choice", q:"A problem appears that nobody has seen before. What makes it possible to find the cause?",
       opts:[ {t:"Detailed records of what happened", ok:1},
              {t:"The four signals and nothing more", why:"The signals tell you that something is wrong. For a new problem you need details to find out why."},
              {t:"Restarting everything at once", why:"A restart may hide the problem for a while. It does not show the cause, so the problem returns."} ],
       point:"Records of what the system did, called logs, let you ask questions nobody planned for.",
       ex:"A ship's logbook. When something goes wrong, you read back what happened and when." }
    ]}
 ]},

 { n:4, title:"Alarms worth waking up for", blurb:"Which problems deserve a person's attention, and when.", nodes:[

  /* ------------------------------------------------------------ 4.1 */
  { id:"l4-1", type:"lesson", code:"4.1", title:"Alert, ticket or log", sub:"6 questions. Three ways to report a problem.",
    intro:{ h:"Now, soon, or never", p:"Monitoring can tell people about a problem in three ways. An alert interrupts someone now. A ticket asks someone to look during working hours. A log is only written down, in case it is needed later. The skill is choosing the right one." },
    take:"Alert: a person must act now. Ticket: a person must act soon. Log: nobody needs to act.",
    qs:[
     { type:"choice", q:"Payments on a shop website have failed for all customers for five minutes. How should the team hear about it?",
       opts:[ {t:"An alert, right now", ok:1},
              {t:"A ticket for tomorrow", why:"Every minute costs sales and trust. This cannot wait until tomorrow."},
              {t:"A line in a log file", why:"Nobody reads log files as they are written. Customers would be let down for hours."} ],
       point:"If users are being let down right now, a person must know right now.",
       ex:"A fire alarm rings immediately. It does not send a letter." },

     { type:"choice", q:"At the current pace, a disk will be full in three weeks. How should the team hear about it?",
       opts:[ {t:"A ticket to handle this week", ok:1},
              {t:"An alert in the middle of the night", why:"Nothing breaks tonight. Waking someone for a problem three weeks away wears people out."},
              {t:"No message at all", why:"In three weeks it becomes an outage. Someone has to act, only not this minute."} ],
       point:"Needs action, but not now: that is a ticket.",
       ex:"The car says 'service due in 1,000 km'. You book the garage. You do not stop on the motorway." },

     { type:"sort", q:"How should each of these be reported?", buckets:["Alert now","Ticket","Log only"],
       items:[ {t:"The whole website is down", b:0, why:"Every user is affected, right now. Someone must act immediately."},
               {t:"A security certificate must be renewed within 20 days", b:1, why:"It needs action, but there is time to plan it."},
               {t:"Last night's backup finished without problems", b:2, why:"Nothing needs to be done. It is good to have it on record."},
               {t:"One spare machine failed and the others took over", b:1, why:"Users notice nothing, so nobody needs to wake up. The machine does need replacing soon."} ],
       point:"Urgency decides: now, soon, or only on record.",
       ex:"A hospital has an emergency room, appointments, and notes in the file." },

     { type:"choice", q:"An alert wakes an engineer at night. She looks, finds nothing she can do, and goes back to sleep. What is wrong with this alert?",
       opts:[ {t:"It asked for no action", ok:1},
              {t:"Nothing. Better safe than sorry", why:"An alert with nothing to do only costs sleep. After a few of these, people stop reacting to alerts."},
              {t:"It should have woken more people", why:"More people with nothing to do makes it worse. An alert must come with something a person can do."} ],
       point:"Every alert must need a person to do something, now.",
       ex:"A doorbell that rings when nobody is at the door. After a week you stop going to the door." },

     { type:"choice", q:"True or false: if a system can repair a problem by itself, a person should still be woken up for it.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"If no human decision is needed, waking someone adds nothing. Let the system repair it and write it in a log."} ],
       point:"Alert a person only when a person's judgement is needed.",
       ex:"A thermostat turns the heating on without phoning you first." },

     { type:"choice", q:"Which problem deserves to wake someone at night?",
       opts:[ {t:"Customers cannot pay", ok:1},
              {t:"A report is one hour late", why:"Nobody needs the report at night. It can wait until morning."},
              {t:"A test machine is slow", why:"Test machines do not serve customers. Nobody is let down tonight."} ],
       point:"Urgent, real, and felt by users: those three together deserve an alert.",
       ex:"You call the plumber at night for a burst pipe, not for a dripping tap." }
    ]},

  /* ------------------------------------------------------------ 4.2 */
  { id:"l4-2", type:"lesson", code:"4.2", title:"Too many alarms", sub:"6 questions. When people stop listening.",
    intro:{ h:"The alarm nobody hears", p:"An alarm that rings all day stops being an alarm. People learn to ignore it, and then they miss the one that matters. Engineers call this alert fatigue. The cure is fewer and better alerts." },
    take:"Few alerts, each one real, urgent and tied to what users feel. Repair or remove the noisy ones.",
    qs:[
     { type:"choice", q:"A team gets 300 alerts a day. Almost all are harmless. What is the biggest danger?",
       opts:[ {t:"The one real alert gets ignored", ok:1},
              {t:"The alert system gets overloaded", why:"The system can send them. The people cannot read them, and that is the weak point."},
              {t:"The alerts cost too much money", why:"The cost is not money. It is attention: nobody can tell the one real alert from the 299 others."} ],
       point:"Too many alerts teach people to ignore alerts. This is called alert fatigue.",
       ex:"The boy who shouted 'wolf' every day. When the wolf came, nobody ran." },

     { type:"choice", q:"An alert has rung every night for a month. Each time, nothing was wrong. What should the team do with it?",
       opts:[ {t:"Repair it or remove it", ok:1},
              {t:"Keep it. One day it may be right", why:"By then nobody will believe it. An alert that was wrong 30 times will be ignored the next time too."},
              {t:"Send it to more people", why:"That spreads the noise. More people will learn to ignore it."} ],
       point:"A false alarm is a fault in the alerting. Treat it like any other fault: fix it.",
       ex:"A car alarm that goes off every night. Nobody looks out of the window any more." },

     { type:"choice", q:"Which alert is the most useful to wake someone for?",
       opts:[ {t:"1 out of 10 logins is failing", ok:1},
              {t:"A processor is 90% busy", why:"A busy processor is not a problem by itself. Maybe everything still works for users."},
              {t:"1 out of 50 servers restarted", why:"With 49 others running, users may notice nothing. This can wait for the morning."} ],
       point:"Alert on what users feel, not on every cause that might matter.",
       ex:"Wake the doctor when the patient cannot breathe, not for every small change on a screen." },

     { type:"choice", q:"The objective is 99.9%. Suddenly the error budget for the whole month is being used up within a few hours. What is the right reaction?",
       opts:[ {t:"Alert someone now", ok:1},
              {t:"Wait for the monthly report", why:"At this pace the budget is gone today. The monthly report would come weeks too late."},
              {t:"Create a ticket for next week", why:"By next week the whole budget is gone and users have been let down for days."} ],
       point:"How fast the budget is being used tells you how urgent the problem is.",
       ex:"A water tank that should last a month is emptying in a day. You do not wait for the weekly check." },

     { type:"sort", q:"Is it a good alert or noise?", buckets:["Good alert","Noise"],
       items:[ {t:"Checkout errors are ten times higher than normal", b:0, why:"Customers are being let down right now."},
               {t:"A nightly job took two minutes longer than usual", b:1, why:"Nobody is affected and nothing needs to be done."},
               {t:"No customer has been able to log in for five minutes", b:0, why:"That is urgent and felt by every user."},
               {t:"A spare disk is 60% full", b:1, why:"Nothing is wrong. There is nothing for a person to do."} ],
       point:"A good alert is urgent, real and felt by users. The rest is noise.",
       ex:"A smoke detector that also beeps for every piece of toast teaches you to remove the battery." },

     { type:"choice", q:"After each on-call week, a team looks back at every alert that rang. What is the main question to ask?",
       opts:[ {t:"Did this alert need a person?", ok:1},
              {t:"Who caused this alert?", why:"That looks for someone to blame. The goal is better alerts, not a guilty person."},
              {t:"Which alerts can we add?", why:"More alerts is rarely the answer. The review should remove noise first."} ],
       point:"Review alerts regularly. Each one must earn its place.",
       ex:"Clearing out a wardrobe: what did I really wear this year?" }
    ]},

  /* ------------------------------------------------------------ Checkpoint C */
  { id:"x-c", type:"exam", code:"C", title:"Checkpoint C", sub:"10 questions. Pass mark 80%. Earns the rank Watchkeeper.", pass:80,
    intro:{ h:"Checkpoint C", p:"Ten questions on watching a system and on alerts. No second tries, but you still get the explanation after each answer. You need 8 out of 10 to pass." },
    qs:[
     { from:"l3-1", type:"choice", q:"A service is fast and has no errors, but its storage is 99% full. Which signal is warning you?",
       opts:[ {t:"How full (saturation)", ok:1},
              {t:"How slow (latency)", why:"The service is still fast. The warning comes from space that is running out."},
              {t:"How busy (traffic)", why:"Nothing is said about the number of visitors. The warning comes from space that is running out."} ],
       point:"Saturation warns before users feel anything.",
       ex:"The fuel light comes on while the car still drives perfectly." },

     { from:"l3-1", type:"choice", q:"Engineers use the word latency. What does it measure?",
       opts:[ {t:"How long a user waits", ok:1},
              {t:"How many users there are", why:"That is traffic. Latency is about waiting time."},
              {t:"How many answers fail", why:"Those are errors. Latency is about waiting time."} ],
       point:"Latency: the waiting time for an answer.",
       ex:"The time between pressing the lift button and the doors opening." },

     { from:"l3-2", type:"choice", q:"A shop's search is slow because a server has too little memory. What is the cause?",
       opts:[ {t:"Too little memory", ok:1},
              {t:"The slow search", why:"That is the symptom: what the customer feels. The cause is the reason behind it."},
              {t:"Unhappy customers", why:"That is a result of the symptom. The cause is the reason the search is slow."} ],
       point:"The cause is the reason behind what users feel.",
       ex:"The cough is the symptom. The cold is the cause." },

     { from:"l3-2", type:"sort", q:"Is it a symptom or a cause?", buckets:["Symptom","Cause"],
       items:[ {t:"The app shows a blank screen", b:0, why:"The user sees this directly."},
               {t:"A setting was changed by mistake", b:1, why:"Users do not see settings. It is a reason behind what they feel."},
               {t:"Messages arrive an hour late", b:0, why:"The user feels this."},
               {t:"A power supply failed", b:1, why:"It explains why something stopped. No user sees it."} ],
       point:"What users feel is the symptom. Why it happens is the cause.",
       ex:"The lights go out: symptom. A blown fuse: cause." },

     { from:"l3-2", type:"choice", q:"From outside, a test visitor tries to log in to your site every minute. What is this good for?",
       opts:[ {t:"Seeing what users experience", ok:1},
              {t:"Finding the exact cause", why:"The test visitor only sees that login fails, not why. For the cause you look inside."},
              {t:"Measuring how full disks are", why:"A test visitor cannot see inside the machines."} ],
       point:"An outside check shows the service as users see it.",
       ex:"A mystery shopper tells the owner what customers really experience." },

     { from:"l4-1", type:"choice", q:"A problem needs action this week, but nothing breaks today. What is the right way to report it?",
       opts:[ {t:"A ticket", ok:1},
              {t:"An alert, at once", why:"Nothing is urgent. An alert would interrupt someone for no reason."},
              {t:"Only a log entry", why:"Then nobody acts, and next week it becomes an outage."} ],
       point:"Action needed soon, not now: a ticket.",
       ex:"A letter from the dentist about your yearly check. You make an appointment. You do not run there." },

     { from:"l4-1", type:"choice", q:"True or false: every alert should need a person to do something.",
       opts:[ {t:"True", ok:1},
              {t:"False", why:"An alert with nothing to do only interrupts. After a few of those, people stop reacting."} ],
       point:"No action needed means it should not be an alert.",
       ex:"A phone that rings with nobody on the line." },

     { from:"l4-1", type:"sort", q:"How should each of these be reported?", buckets:["Alert now","Ticket","Log only"],
       items:[ {t:"All video calls are failing", b:0, why:"Every user is affected right now."},
               {t:"A machine must be replaced within a month", b:1, why:"It needs action, but there is time to plan it."},
               {t:"The daily check passed", b:2, why:"Nothing needs to be done."},
               {t:"Half of all payments fail", b:0, why:"Customers are being let down right now."} ],
       point:"Urgency decides: now, soon, or only on record.",
       ex:"Ambulance, appointment, or a note in the file." },

     { from:"l4-2", type:"choice", q:"What is alert fatigue?",
       opts:[ {t:"Ignoring alerts because there are too many", ok:1},
              {t:"Being tired after working at night", why:"That is ordinary tiredness. Alert fatigue means no longer reacting, because most alerts were nothing."},
              {t:"Alerts arriving later than they should", why:"That is a delay in the system. Alert fatigue is about people who stop reacting."} ],
       point:"Too many alerts teach people to stop listening.",
       ex:"A colleague who says 'urgent!' about everything. After a while, nothing sounds urgent." },

     { from:"l4-2", type:"choice", q:"Which alert is best tied to what users feel?",
       opts:[ {t:"Pages take more than 5 seconds to open", ok:1},
              {t:"A server fan is running at high speed", why:"A fan says nothing about what users experience. Maybe everything works well."},
              {t:"A log file is larger than yesterday", why:"A large file is not something users feel. It may mean nothing at all."} ],
       point:"The best alerts describe what users experience.",
       ex:"A restaurant owner worries about guests waiting an hour, not about how loud the dishwasher is." }
    ]}
 ]},

 { n:5, title:"Boring work, and how to get rid of it", blurb:"Repeated work by hand, and why engineers replace it.", nodes:[

  /* ------------------------------------------------------------ 5.1 */
  { id:"l5-1", type:"lesson", code:"5.1", title:"Spot the toil", sub:"6 questions. The work that never ends.",
    intro:{ h:"The same task, again", p:"Some work has to be done by hand, again and again, and leaves nothing better behind. Restarting the same program every morning. Copying the same numbers every week. Engineers call this toil. It grows as the service grows, until there is time for nothing else." },
    take:"Toil: manual, repeated work that a machine could do and that leaves nothing better behind.",
    qs:[
     { type:"choice", q:"Every morning an engineer restarts the same program by hand, because it gets stuck overnight. What do engineers call this kind of work?",
       opts:[ {t:"Toil", ok:1},
              {t:"Monitoring", why:"Monitoring is watching the system. This is repairing the same thing by hand, every day."},
              {t:"A project", why:"A project ends and leaves something better behind. This task returns every morning."} ],
       point:"Toil: manual work that keeps coming back and improves nothing.",
       ex:"Emptying a bucket under a leaking roof every day, instead of repairing the roof." },

     { type:"sort", q:"Is it toil or not?", buckets:["Toil","Not toil"],
       items:[ {t:"Copying numbers from one screen to another every week", b:0, why:"Manual, repeated, and a machine could do it."},
               {t:"Designing a new backup system", b:1, why:"This is done once and makes things better for a long time."},
               {t:"Resetting passwords by hand, 30 times a day", b:0, why:"The same manual task, again and again."},
               {t:"Writing a tool that resets passwords automatically", b:1, why:"This removes toil. It is done once and keeps paying back."} ],
       point:"Toil repeats and leaves nothing behind. Engineering is done once and keeps helping.",
       ex:"Carrying water from the well every day is toil. Laying a pipe is engineering." },

     { type:"choice", q:"Which feature shows best that a task is toil?",
       opts:[ {t:"It comes back again and again", ok:1},
              {t:"It is difficult to do", why:"Toil is often easy. The problem is the repeating, not the difficulty."},
              {t:"It is done by an engineer", why:"Engineers do many kinds of work. What makes it toil is that it is manual and keeps returning."} ],
       point:"The mark of toil is repetition without improvement.",
       ex:"Mowing the lawn: easy, and it is back next week." },

     { type:"choice", q:"A team does 1 hour of manual work a week for every 100 customers. The number of customers grows from 500 to 5,000. What happens to the manual work?",
       opts:[ {t:"It grows from 5 to 50 hours a week", ok:1},
              {t:"It stays at 5 hours a week", why:"The work is tied to the number of customers. Ten times the customers means ten times the work."},
              {t:"It grows from 5 to 10 hours a week", why:"Ten times the customers means ten times the work: 50 hours, more than one full job."} ],
       point:"Toil grows with the service. Left alone, it takes all of the team's time.",
       ex:"Washing dishes by hand works for a family. A restaurant with 200 guests needs a machine." },

     { type:"choice", q:"True or false: sitting in a team meeting is toil.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"Meetings can be dull, but they are not manual, repeated work on the service that a machine could do. Not everything boring is toil."} ],
       point:"Toil does not mean 'work I dislike'. It means manual, repeated work on the running service.",
       ex:"Filling in your holiday form is paperwork. Typing the same command on 50 servers is toil." },

     { type:"choice", q:"Why is a lot of toil bad for a team?",
       opts:[ {t:"No time is left to improve", ok:1},
              {t:"Toil is always done badly", why:"Often it is done well. The problem is what does not get done in the meantime."},
              {t:"Customers can see the toil", why:"Customers do not see it. They only feel that the service does not get better."} ],
       point:"Google's SRE teams aim to keep toil under half of their time. The rest is for making things better.",
       ex:"A cook who washes dishes all evening never has time to improve the menu." }
    ]},

  /* ------------------------------------------------------------ 5.2 */
  { id:"l5-2", type:"lesson", code:"5.2", title:"Automate, with care", sub:"6 questions. Let the machine do it, safely.",
    intro:{ h:"Do it once, properly", p:"The cure for toil is to let a machine do the task, or to remove the need for it. Engineers call this automation. It saves time, and a machine does not get tired or skip a step. But a machine also repeats a mistake faster than any person could." },
    take:"Remove the task if you can. Automate it if you cannot. And put limits on what automation may do.",
    qs:[
     { type:"choice", q:"A task takes 5 minutes and is done by hand 20 times a day. What is the best long-term answer?",
       opts:[ {t:"Let a program do it", ok:1},
              {t:"Hire someone for only this", why:"That moves the toil to another person. The task still grows with the service."},
              {t:"Learn to do it faster", why:"Even at half the time it returns 20 times a day, and maybe 40 times a day next year."} ],
       point:"A task that repeats and is always the same belongs to a machine.",
       ex:"Nobody copies a book by hand since the printing press." },

     { type:"choice", q:"A report is made by hand every week. Nobody has read it for a year. What is the best fix?",
       opts:[ {t:"Stop making the report", ok:1},
              {t:"Automate making the report", why:"Then a machine makes something nobody reads. Better than by hand, but still waste."},
              {t:"Make it once a month", why:"Less waste is still waste. If nobody reads it, it does not need to exist."} ],
       point:"Before automating a task, ask whether it needs to be done at all.",
       ex:"Before buying a robot that irons socks, ask whether socks need ironing." },

     { type:"order", q:"Which task should be automated first? Put them in order, the best choice first.",
       items:["Done 50 times a day, always the same","Done once a week, always the same","Done once a year, different every time"],
       point:"Automate what is frequent and predictable first.",
       ex:"You buy a dishwasher before you buy a machine for the yearly window cleaning." },

     { type:"choice", q:"A person types a wrong command and breaks one server. A program with the same mistake runs on all 1,000 servers at once. What does this show?",
       opts:[ {t:"Automation spreads mistakes fast", ok:1},
              {t:"Automation should not be used", why:"Automation is still the answer to toil. It needs limits, not a ban."},
              {t:"People make fewer mistakes", why:"People make more mistakes, only slower and on a smaller scale."} ],
       point:"A machine does exactly what it is told, everywhere, at once. That includes mistakes.",
       ex:"A printing press with a spelling mistake prints it ten thousand times." },

     { type:"choice", q:"What makes an automatic program safer to run on many servers?",
       opts:[ {t:"It starts with a few and checks the result", ok:1},
              {t:"It runs on all servers at the same moment", why:"Then a mistake reaches every server before anyone can react."},
              {t:"It runs only at night, when it is quiet", why:"A mistake at night is still a mistake, with fewer people awake to notice."} ],
       point:"Good automation works in small steps, checks itself and can be stopped.",
       ex:"A cook tastes one spoon before serving the whole pot." },

     { type:"choice", q:"True or false: once a task is automated, nobody needs to understand how it works any more.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"When the automation fails, a person must take over. That only works if someone still understands the task."} ],
       point:"Automation does the work. People must still understand it.",
       ex:"A pilot uses the autopilot, and still knows how to fly." }
    ]}
 ]},

 { n:6, title:"On call without burning out", blurb:"Who answers when something breaks, and how to keep that healthy.", nodes:[

  /* ------------------------------------------------------------ 6.1 */
  { id:"l6-1", type:"lesson", code:"6.1", title:"Being on call", sub:"6 questions. The person who answers.",
    intro:{ h:"Someone has to answer", p:"Services run day and night, so someone must be reachable when an alert comes. That person is on call. Being on call does not mean knowing everything. It means reacting quickly, following the plan, and asking for help in time." },
    take:"On call: reachable, quick to react, and never afraid to ask for help.",
    qs:[
     { type:"choice", q:"A team takes turns being the person who must respond when an alert comes, also at night. What is this called?",
       opts:[ {t:"Being on call", ok:1},
              {t:"Working overtime", why:"Overtime is extra working hours. On call means being reachable and ready, and working only when an alert comes."},
              {t:"Doing a night shift", why:"On a night shift you work all night. On call you are at home and act only when an alert comes."} ],
       point:"On call: being reachable and ready to respond when the service needs a person.",
       ex:"A doctor on call sleeps at home with the phone switched on." },

     { type:"choice", q:"An alert says customers cannot pay. The on-call engineer sees it two hours later. Why is that a problem?",
       opts:[ {t:"Customers were let down for two hours", ok:1},
              {t:"The engineer lost two hours of work", why:"The lost working time is small. The harm is to customers who could not pay all that time."},
              {t:"The alert was sent two hours too early", why:"The alert came at the right moment: when customers were affected. The reaction came too late."} ],
       point:"On call means reacting within minutes. Each minute of delay is a minute of harm.",
       ex:"A fire engine that leaves the station two hours after the call." },

     { type:"choice", q:"An alert comes with a written guide: what it means, what to check, what to try first. Engineers call this a runbook. Why is it useful?",
       opts:[ {t:"The first steps are already thought out", ok:1},
              {t:"It makes the engineer unnecessary", why:"A guide helps a person. It cannot judge a new situation."},
              {t:"It stops incidents from happening", why:"It does not prevent anything. It helps people react well when something does happen."} ],
       point:"A runbook is thinking done in advance, when there was time and calm.",
       ex:"The safety card in a plane. Nobody wants to work out the steps during the emergency." },

     { type:"choice", q:"The on-call engineer has worked on a problem for 30 minutes and is stuck. Customers are still affected. What is the right move?",
       opts:[ {t:"Call for help now", ok:1},
              {t:"Keep trying alone for another hour", why:"Customers pay for that hour. Asking for help is part of the job, not a failure."},
              {t:"Wait for colleagues in the morning", why:"Customers are affected now. Waiting until morning adds hours of harm."} ],
       point:"Asking for help early is a strength. Engineers call it escalating.",
       ex:"A lifeguard calls for backup while swimming out, not afterwards." },

     { type:"choice", q:"True or false: a good on-call engineer never needs to ask for help.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"Nobody knows every system. Good engineers ask early, because customers come before pride."} ],
       point:"Being on call is about getting the problem solved, not about solving it alone.",
       ex:"A family doctor who sends you to a specialist is doing the job well." },

     { type:"order", q:"The on-call week ends. Put the handover in a sensible order.",
       items:["Write down what happened this week","Tell the next person what is still open","Check that alerts reach the next person","Switch off your own alerts"],
       point:"A handover passes on knowledge first, then the alerts.",
       ex:"Nurses changing shifts go through every patient before the first one leaves." }
    ]},

  /* ------------------------------------------------------------ 6.2 */
  { id:"l6-2", type:"lesson", code:"6.2", title:"A healthy rota", sub:"6 questions. Keeping it bearable.",
    intro:{ h:"People are not machines", p:"A tired person makes poor decisions, and poor decisions cause outages. So on-call work must be shared fairly, limited, and followed by rest. A healthy on-call schedule is not a gift to the team. It is part of reliability." },
    take:"Share the load, limit the interruptions, rest after a hard night. Tired people make mistakes.",
    qs:[
     { type:"choice", q:"One engineer has been on call alone, every night, for three months. What is the main risk?",
       opts:[ {t:"Tiredness leads to mistakes", ok:1},
              {t:"None, if the engineer is good", why:"Skill does not replace sleep. Even the best engineer decides badly after months without rest."},
              {t:"Colleagues feel left out", why:"That may be true. But the real danger is a worn-out person making decisions about a live service."} ],
       point:"On-call duty must be shared. One tired person is a risk to the service.",
       ex:"Lorry drivers have rest times set by law. Not out of kindness: tired drivers crash." },

     { type:"choice", q:"Alerts woke an engineer four times last night. What should be normal the next morning?",
       opts:[ {t:"Time to rest and start later", ok:1},
              {t:"A normal working day from nine", why:"After a broken night, people think slowly and make mistakes. Rest protects the service too."},
              {t:"An extra on-call night to learn", why:"More broken nights make it worse. Learning does not happen without sleep."} ],
       point:"Rest after a hard night is part of the job, not a favour.",
       ex:"A surgeon does not operate after being awake for 24 hours." },

     { type:"choice", q:"An on-call engineer gets 15 alerts in one shift. There is no time to look at any of them properly. What should the team conclude?",
       opts:[ {t:"The service needs repair work", ok:1},
              {t:"The engineer should work faster", why:"Nobody can handle 15 incidents well in one shift. The number of alerts is the problem."},
              {t:"This is normal for on-call work", why:"It should not be. A healthy shift has only a few incidents, each handled completely."} ],
       point:"A healthy shift has few incidents, so each one gets full attention and a proper follow-up.",
       ex:"A doctor who sees 100 patients an hour cures nobody." },

     { type:"choice", q:"During a stressful incident, which approach leads to the best decisions?",
       opts:[ {t:"Follow the agreed steps calmly", ok:1},
              {t:"Trust the first idea and act fast", why:"Under stress, the first idea is often wrong. Acting on it quickly can make the outage bigger."},
              {t:"Try several fixes at the same time", why:"Then nobody knows which change helped and which one made it worse."} ],
       point:"Stress makes people careless. Agreed steps protect against that.",
       ex:"Pilots use checklists in an emergency, because stress makes people forget." },

     { type:"sort", q:"Is this a healthy or an unhealthy on-call setup?", buckets:["Healthy","Unhealthy"],
       items:[ {t:"On-call duty rotates between six people", b:0, why:"The load is shared and everybody learns."},
               {t:"The same expert is called every time", b:1, why:"One person carries all the load, and nobody else learns."},
               {t:"Time off after a night with many alerts", b:0, why:"Rested people make better decisions."},
               {t:"On-call nights without any agreement or pay", b:1, why:"Being available costs free time. Without a fair agreement, people burn out or leave."} ],
       point:"Healthy on-call: shared, limited, rested and fairly agreed.",
       ex:"A volunteer fire brigade works because the duty is spread over many people." },

     { type:"choice", q:"One engineer always saves the day by working through the night. Why is that a problem for the team?",
       opts:[ {t:"The real weakness stays hidden", ok:1},
              {t:"It is not a problem. It works", why:"It works until that person is ill or leaves. And the weakness in the service is never repaired."},
              {t:"Other engineers get jealous", why:"The problem is not feelings. The service only works because one person keeps rescuing it."} ],
       point:"A service that needs a hero is not reliable. Fix the service.",
       ex:"A shop that only opens on time because one employee comes at 5 am to repair the door has a door problem." }
    ]}
 ]},

 { n:7, title:"When it breaks", blurb:"What to do in the first minutes of an incident, and who does what.", nodes:[

  /* ------------------------------------------------------------ 7.1 */
  { id:"l7-1", type:"lesson", code:"7.1", title:"First, stop the harm", sub:"6 questions. The first minutes.",
    intro:{ h:"Stop the harm first", p:"When a service fails for its users, engineers call it an incident. The first goal is not to understand it. The first goal is to make it stop hurting users. Understanding comes later, when everyone is calm." },
    take:"In an incident: first stop the harm, then find the cause.",
    qs:[
     { type:"choice", q:"A service is failing for many users right now. What do engineers call this?",
       opts:[ {t:"An incident", ok:1},
              {t:"A release", why:"A release is a new version going live. It may cause an incident, but it is not the same thing."},
              {t:"A ticket", why:"A ticket is a note about work to do. An incident is the event itself, happening now."} ],
       point:"Incident: the service is failing its users, and people must act.",
       ex:"A burst water pipe: it is happening now and it needs action now." },

     { type:"choice", q:"A new version went live ten minutes ago. Since then, logins fail. What is the best first move?",
       opts:[ {t:"Go back to the previous version", ok:1},
              {t:"Study the new code to find the bug", why:"That can take hours, and users cannot log in all that time. Undo first, study later."},
              {t:"Wait and see if it recovers", why:"Every minute of waiting is a minute in which nobody can log in."} ],
       point:"Undoing the last change is often the fastest way to stop the harm. It is called a rollback.",
       ex:"If a new medicine makes the patient worse, the doctor stops it first and investigates afterwards." },

     { type:"order", q:"An incident starts. Put the steps in order.",
       items:["Notice that users are affected","Stop the harm","Find the real cause","Make sure it cannot happen again"],
       point:"Notice, stop the harm, understand, prevent. In that order.",
       ex:"A kitchen fire: see it, put it out, find out how it started, change how you cook." },

     { type:"choice", q:"An engineer sees a problem that might be serious, but is not sure. What is the better choice?",
       opts:[ {t:"Raise the alarm early", ok:1},
              {t:"Wait until it is certain", why:"By then it is bigger and help arrives late. Ending a false alarm costs little. A late start costs a lot."},
              {t:"Fix it quietly alone", why:"If it grows, nobody knows what was tried, and help starts from zero."} ],
       point:"Declare an incident early. Calling it off is cheap. Starting late is expensive.",
       ex:"Call the fire brigade when you smell smoke, not when you see flames." },

     { type:"choice", q:"During an incident, five engineers each try their own fix at the same time, without telling each other. What is the likely result?",
       opts:[ {t:"Confusion, and maybe more damage", ok:1},
              {t:"The fastest possible repair", why:"Changes can work against each other, and nobody knows which one did what."},
              {t:"Five times the chance of success", why:"Five uncoordinated changes are five new risks. If it gets better or worse, nobody knows why."} ],
       point:"Uncoordinated action makes incidents worse. Someone has to coordinate.",
       ex:"Five cooks each adding salt to the same soup." },

     { type:"choice", q:"True or false: during an incident, finding out who made the mistake comes first.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"Users are still affected. Who did what can be studied later, and even then the goal is to learn, not to blame."} ],
       point:"During an incident there is one question: how do we stop the harm?",
       ex:"When the boat is leaking, you bail first. Who left the plug out is for later." }
    ]},

  /* ------------------------------------------------------------ 7.2 */
  { id:"l7-2", type:"lesson", code:"7.2", title:"Who does what", sub:"6 questions. Clear roles under pressure.",
    intro:{ h:"One person leads", p:"A serious incident needs more than one person, and that needs organisation. One person leads and decides: the incident commander. Others do the technical work. Someone keeps everyone else informed. Clear roles prevent chaos." },
    take:"Incident roles: one leads, some repair, one informs. Everyone knows who is who.",
    qs:[
     { type:"choice", q:"During a large incident, one person coordinates: this person decides what is tried and who does what. What is this role called?",
       opts:[ {t:"Incident commander", ok:1},
              {t:"Team manager", why:"The role is not about rank. Anyone who is trained can lead an incident, also when the manager is present."},
              {t:"Lead developer", why:"The best technician is often needed for the repair itself. Leading the incident is a separate role."} ],
       point:"The incident commander leads the response. It is a role for the incident, not a job title.",
       ex:"At an accident, one firefighter directs the scene. The others do not vote on each step." },

     { type:"choice", q:"Should the incident commander also type the commands that repair the system?",
       opts:[ {t:"No. Leading needs the full overview", ok:1},
              {t:"Yes. The leader knows the most", why:"A person who is typing cannot keep the overview. And the commander need not be the best technician."},
              {t:"Yes. It saves one person", why:"It costs more than it saves. Without someone watching the whole picture, the response falls apart."} ],
       point:"The one who leads does not repair. Each role needs full attention.",
       ex:"A conductor does not play the violin at the same time." },

     { type:"choice", q:"During an outage, customers and managers keep asking the engineers for news. What solves this best?",
       opts:[ {t:"One person gives regular updates", ok:1},
              {t:"The engineers answer between tasks", why:"Every question interrupts the repair. One person who only informs keeps the others free."},
              {t:"Nobody answers until it is fixed", why:"Silence makes people worry and call more. Regular short updates keep them calm."} ],
       point:"A communications role protects the people who repair, and keeps everyone else informed.",
       ex:"In a hospital, one person speaks to the family while the surgeons operate." },

     { type:"sort", q:"Which role does this?", buckets:["Commander","Repair team","Communications"],
       items:[ {t:"Decides to go back to the old version", b:0, why:"Deciding what is tried is the commander's job."},
               {t:"Carries out the change on the servers", b:1, why:"The technical work belongs to the repair team."},
               {t:"Writes the status update for customers", b:2, why:"Keeping others informed is the communications role."},
               {t:"Asks two more engineers to join", b:0, why:"Organising who does what is the commander's job."} ],
       point:"One leads, some repair, one informs.",
       ex:"On a ship: the captain decides, the engineers work in the engine room, the radio officer talks to the coast." },

     { type:"choice", q:"The incident commander has led for six hours and is exhausted. What should happen?",
       opts:[ {t:"A clear handover to someone else", ok:1},
              {t:"Continue until it is solved", why:"An exhausted leader makes poor decisions. Handing over is a strength."},
              {t:"Leave quietly and let others manage", why:"Then nobody leads, and nobody knows it. A handover must be said out loud and confirmed."} ],
       point:"A handover is said out loud: 'You are now the commander.' And the other person confirms it.",
       ex:"Pilots say 'you have control' and wait for 'I have control'." },

     { type:"choice", q:"An engineer who is not part of the incident team sees the problem and wants to help. What should he do?",
       opts:[ {t:"Offer help to the commander", ok:1},
              {t:"Change the system himself", why:"The team may be in the middle of something. An unknown change can undo their work or hide the cause."},
              {t:"Stay away and say nothing", why:"He may know something useful. Offering it through the commander helps without causing confusion."} ],
       point:"Help goes through the commander. Changes nobody knows about make incidents worse.",
       ex:"At an accident, bystanders ask the ambulance crew what to do. They do not start moving the patient." }
    ]}
 ]},

 { n:8, title:"Learning without blame", blurb:"How to make sure the same failure does not come back.", nodes:[

  /* ------------------------------------------------------------ 8.1 */
  { id:"l8-1", type:"lesson", code:"8.1", title:"The review afterwards", sub:"6 questions. Writing down what happened.",
    intro:{ h:"Never waste an incident", p:"An incident costs money and trust. The only good thing about it is what it can teach. So after an incident, the team writes down what happened, why, and what will change. Engineers call this a postmortem." },
    take:"Postmortem: a written record of what happened, why, and what will change so that it does not return.",
    qs:[
     { type:"choice", q:"After an incident, the team writes down what happened, what the effect was, why it happened, and what will change. What is this document called?",
       opts:[ {t:"A postmortem", ok:1},
              {t:"A runbook", why:"A runbook is written before incidents: what to do when an alert comes. This is written afterwards, to learn."},
              {t:"An objective", why:"An objective is the number a team aims for. This is a review of an incident."} ],
       point:"Postmortem: the written review of an incident.",
       ex:"After a football match, the coach watches the recording with the team." },

     { type:"choice", q:"When is the best time to write the review of an incident?",
       opts:[ {t:"Within a few days", ok:1},
              {t:"At the end of the year", why:"By then nobody remembers the details, and the same failure may have returned several times."},
              {t:"Only if a manager asks", why:"Then most lessons are lost. The review is for the team and its users, not for the manager."} ],
       point:"Write the review soon. Memories fade within days.",
       ex:"A witness statement is taken the same day, not a year later." },

     { type:"sort", q:"Does it belong in a postmortem?", buckets:["Belongs in it","Does not belong"],
       items:[ {t:"A timeline of what happened and when", b:0, why:"The facts in order are the base of every review."},
               {t:"The name of the person to punish", b:1, why:"The review is for learning. Punishment makes people hide things next time."},
               {t:"The effect on users", b:0, why:"How much users were hurt shows how much the lesson is worth."},
               {t:"Guesses written down as facts", b:1, why:"A wrong 'fact' leads to the wrong repair. Mark what is known and what is not."} ],
       point:"A good review has facts, effect, causes and actions. No blame and no guesses.",
       ex:"An accident report describes what happened and what must change. It is not a court verdict." },

     { type:"choice", q:"A postmortem ends with a list of improvements. Six months later, none of them are done. What was missing?",
       opts:[ {t:"An owner for each action", ok:1},
              {t:"A longer document", why:"More pages do not get work done. Someone has to be responsible for each action."},
              {t:"More people in the meeting", why:"More listeners do not get work done. Each action needs one person who owns it."} ],
       point:"An action without an owner is a wish. Each one needs a name and a date.",
       ex:"'Someone should repair the fence' never repairs the fence." },

     { type:"choice", q:"Why share a postmortem with other teams too?",
       opts:[ {t:"So they can avoid the same failure", ok:1},
              {t:"So they know who made the mistake", why:"A good review does not point at a person. It is shared to spread the lesson."},
              {t:"Because rules require the paperwork", why:"A review nobody reads is only paperwork. Its value is that others learn without having the incident themselves."} ],
       point:"A shared review lets many teams learn from one incident.",
       ex:"Aviation shares every accident report. That is a large part of why flying is so safe." },

     { type:"choice", q:"True or false: if an incident was solved quickly, there is nothing to learn from it.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"A fast fix says nothing about why it happened. Without understanding the cause, it will return."} ],
       point:"A quick fix ends the incident. Only understanding prevents the next one.",
       ex:"Mopping the floor fast does not repair the leak." }
    ]},

  /* ------------------------------------------------------------ 8.2 */
  { id:"l8-2", type:"lesson", code:"8.2", title:"No blame", sub:"6 questions. Fix the system, not the person.",
    intro:{ h:"'Who' is the wrong question", p:"When something breaks, people look for someone to blame. It feels fair, and it makes things worse. People who fear punishment hide mistakes, and hidden mistakes cannot be fixed. Good teams ask how the system let it happen. This is called a blameless culture." },
    take:"Blameless: ask how the system allowed the mistake, not who made it. People who feel safe report problems early.",
    qs:[
     { type:"choice", q:"An engineer typed a wrong command and caused an outage. Which question is the most useful in the review?",
       opts:[ {t:"Why was that mistake so easy to make?", ok:1},
              {t:"Who typed the command?", why:"The name changes nothing. The next person can type the same wrong command tomorrow."},
              {t:"How should the engineer be punished?", why:"Punishment repairs nothing in the system. It only teaches everyone to hide mistakes."} ],
       point:"Ask what made the mistake possible. That is the part you can repair.",
       ex:"If one person slips on the stairs, they were careless. If ten people slip, repair the stairs." },

     { type:"choice", q:"A company punishes every engineer who causes an incident. What happens over time?",
       opts:[ {t:"People hide their mistakes", ok:1},
              {t:"People stop making mistakes", why:"Everyone makes mistakes. Fear does not prevent them. It only prevents people from telling you."},
              {t:"Incidents become shorter", why:"Incidents get longer: people hesitate to say what they did, so the cause is found later."} ],
       point:"Fear does not reduce mistakes. It reduces honesty.",
       ex:"A child who is shouted at for every broken glass learns to hide the pieces." },

     { type:"choice", q:"A review concludes: 'Cause: human error.' Why is that a weak conclusion?",
       opts:[ {t:"It changes nothing in the system", ok:1},
              {t:"Humans do not really make errors", why:"They do, all the time. That is exactly why a system must be built to handle it."},
              {t:"It is too hard to prove", why:"It is easy to prove, and that is the trap. It feels like an answer, but the next person can make the same error."} ],
       point:"People will always make mistakes. A good system makes them hard to make and easy to undo.",
       ex:"If people keep walking into a glass door, you put a sticker on the door. You do not blame each visitor." },

     { type:"sort", q:"Is this sentence blameless or blaming?", buckets:["Blameless","Blaming"],
       items:[ {t:"The tool allowed deleting without a warning", b:0, why:"It describes a weakness in the system that can be repaired."},
               {t:"He should have been more careful", b:1, why:"It points at a person and repairs nothing."},
               {t:"The test did not cover this case", b:0, why:"It describes a gap that can be closed."},
               {t:"She clearly did not read the manual", b:1, why:"It judges a person. It does not ask why the manual was needed or easy to miss."} ],
       point:"Blameless sentences describe the system. Blaming sentences describe a person.",
       ex:"'The step is loose' helps the next person. 'You are clumsy' does not." },

     { type:"choice", q:"An engineer notices that she made a mistake that nobody has seen yet. In a blameless team, what does she do?",
       opts:[ {t:"Reports it immediately", ok:1},
              {t:"Waits to see if anyone notices", why:"The mistake may grow in the meantime. In a team without blame there is no reason to wait."},
              {t:"Repairs it without telling", why:"A silent repair hides what the team could learn. And if it goes wrong, nobody knows what happened."} ],
       point:"When reporting is safe, problems come out early, while they are still small.",
       ex:"A nurse who can report a wrong dose without fear saves the next patient." },

     { type:"choice", q:"True or false: blameless means that nobody is responsible for anything.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"People stay responsible for their work and for improving it. Blameless means that mistakes lead to learning, not to punishment."} ],
       point:"Blameless is not careless. Everyone stays responsible for making the system better.",
       ex:"A pilot who reports a near miss is not punished. The pilot is still expected to help prevent the next one." }
    ]},

  /* ------------------------------------------------------------ Checkpoint D */
  { id:"x-d", type:"exam", code:"D", title:"Checkpoint D", sub:"10 questions. Pass mark 80%. Earns the rank Responder.", pass:80,
    intro:{ h:"Checkpoint D", p:"Ten questions on toil, on call, incidents and reviews. No second tries, but you still get the explanation after each answer. You need 8 out of 10 to pass." },
    qs:[
     { from:"l5-1", type:"choice", q:"Which of these is toil?",
       opts:[ {t:"Restarting a stuck program by hand, daily", ok:1},
              {t:"Designing a system that restarts itself", why:"That is engineering: done once, and it removes the daily work."},
              {t:"Planning the improvements for next year", why:"Planning is not manual, repeated work on the running service."} ],
       point:"Toil is manual, repeated, and leaves nothing better behind.",
       ex:"Bailing water out of a boat, compared with repairing the hole." },

     { from:"l5-2", type:"choice", q:"A weekly manual task produces a file that nobody uses. What is the best fix?",
       opts:[ {t:"Stop doing the task", ok:1},
              {t:"Automate the task", why:"Then a machine makes a file nobody uses. Still waste."},
              {t:"Do the task faster", why:"Fast waste is still waste."} ],
       point:"First ask whether the task is needed at all.",
       ex:"You do not buy a faster car to drive to a shop that has closed." },

     { from:"l5-2", type:"choice", q:"True or false: automation can spread one mistake to many machines very quickly.",
       opts:[ {t:"True", ok:1},
              {t:"False", why:"A program does exactly what it is told, on every machine, at once. That includes a mistake."} ],
       point:"Automation needs small steps, checks and a way to stop it.",
       ex:"One wrong address on a mailing list sends the letter to the wrong place every single time." },

     { from:"l6-1", type:"choice", q:"An on-call engineer is stuck on a problem that affects customers. What should she do?",
       opts:[ {t:"Ask for help immediately", ok:1},
              {t:"Keep trying until it works", why:"Customers pay for every extra minute. Asking for help is part of the job."},
              {t:"Wait for office hours", why:"Customers are affected now. Waiting adds hours of harm."} ],
       point:"Escalate early. Customers come before pride.",
       ex:"A nurse who is unsure calls the doctor. Nobody thinks less of her for it." },

     { from:"l6-2", type:"choice", q:"Why does a team give engineers rest after a night full of alerts?",
       opts:[ {t:"Tired people make worse decisions", ok:1},
              {t:"It is a reward for good work", why:"It is not a reward. It protects the service: tired people make mistakes."},
              {t:"Alerts are rarer in the morning", why:"Alerts come at any hour. The reason is the person, not the clock."} ],
       point:"Rest is part of reliability.",
       ex:"Train drivers have fixed rest times for the same reason." },

     { from:"l7-1", type:"choice", q:"A release causes errors for users. The cause is not known yet. What comes first?",
       opts:[ {t:"Undo the release", ok:1},
              {t:"Find the exact cause", why:"That can take hours, while users keep getting errors. Stop the harm first."},
              {t:"Write the review", why:"The review comes after the incident, when users are no longer affected."} ],
       point:"First stop the harm, then find the cause.",
       ex:"Turn off the tap before looking for the leak." },

     { from:"l7-1", type:"order", q:"Put the steps of an incident in order.",
       items:["Notice the problem","Stop the harm to users","Find the cause","Prevent it from returning"],
       point:"Notice, stop the harm, understand, prevent.",
       ex:"A fall on the ice: get up, check for injuries, see what you slipped on, put salt on the path." },

     { from:"l7-2", type:"choice", q:"What does an incident commander do?",
       opts:[ {t:"Coordinates the response", ok:1},
              {t:"Types the repair commands", why:"That is the repair team. The commander keeps the overview and decides."},
              {t:"Decides who was at fault", why:"Nobody decides that during an incident. The commander organises the response."} ],
       point:"The commander leads and keeps the overview.",
       ex:"A conductor leads the orchestra and plays no instrument." },

     { from:"l8-1", type:"choice", q:"What does every action in a postmortem need, so that it really gets done?",
       opts:[ {t:"An owner and a date", ok:1},
              {t:"A long explanation", why:"Length does not get work done. A person and a date do."},
              {t:"A manager's signature", why:"A signature approves. It does not do the work. Each action needs someone who owns it."} ],
       point:"No owner, no action.",
       ex:"'We should meet soon' never happens. 'Tuesday at three, I will book the room' does." },

     { from:"l8-2", type:"sort", q:"Is this sentence blameless or blaming?", buckets:["Blameless","Blaming"],
       items:[ {t:"The warning was easy to miss", b:0, why:"It describes something in the system that can be improved."},
               {t:"He never pays attention", b:1, why:"It judges a person and repairs nothing."},
               {t:"The process had no second check", b:0, why:"It describes a gap that can be closed."},
               {t:"She should have known better", b:1, why:"It points at a person. It does not ask why the mistake was possible."} ],
       point:"Describe the system, not the person.",
       ex:"'The road sign was hidden by a tree' leads to a repair. 'Bad driver' does not." }
    ]}
 ]},

 { n:9, title:"Changing things safely", blurb:"Most failures follow a change. How to change without breaking.", nodes:[

  /* ------------------------------------------------------------ 9.1 */
  { id:"l9-1", type:"lesson", code:"9.1", title:"It worked yesterday", sub:"6 questions. Why changes break things.",
    intro:{ h:"It worked yesterday", p:"A system that nobody touches rarely breaks. Most incidents start with a change: a new version, a new setting. But users want improvements, so not changing is no answer. The art is to change safely." },
    take:"Most incidents follow a change. Small, tested changes are the safe way to keep moving.",
    qs:[
     { type:"choice", q:"A service that ran well for months suddenly fails. What is the first question worth asking?",
       opts:[ {t:"What changed recently?", ok:1},
              {t:"How old are the servers?", why:"Age is rarely the trigger. Something that worked yesterday and fails today usually had something changed."},
              {t:"How many users are there?", why:"Possible, if the number of users jumped. But the most common trigger by far is a recent change."} ],
       point:"Most incidents follow a change. Start looking there.",
       ex:"Your bike worked well until you adjusted the brakes yourself." },

     { type:"choice", q:"Team A releases one small change every day. Team B collects 200 changes for one big release every three months. Which way is safer?",
       opts:[ {t:"Team A. Small changes are easy to check", ok:1},
              {t:"Team B. Fewer releases, fewer risks", why:"Each big release carries 200 risks at once. When it breaks, nobody knows which of the 200 did it."},
              {t:"Both ways are equally safe", why:"A small change is easy to check and easy to undo. A release of 200 changes is neither."} ],
       point:"Small changes fail small, and the cause is easy to find.",
       ex:"Adding spices one at a time and tasting in between." },

     { type:"choice", q:"What is the purpose of testing a change before it goes live?",
       opts:[ {t:"To find mistakes before users do", ok:1},
              {t:"To prove there are no mistakes", why:"Tests cannot prove that. They find many mistakes, never all."},
              {t:"To replace watching it after release", why:"Tests find many mistakes, never all. A release still has to be watched once real users arrive."} ],
       point:"Testing catches many mistakes early. It never catches all of them.",
       ex:"A dress rehearsal finds most problems. The opening night can still surprise you." },

     { type:"choice", q:"Nobody changed the software. An engineer changed one setting: the address of a database. Is that a risky change?",
       opts:[ {t:"Yes. A setting can break everything", ok:1},
              {t:"No. Only new code is risky", why:"A wrong setting can stop the whole service as surely as a bug. Treat settings like code."},
              {t:"No. Settings are easy to change", why:"Easy to change also means easy to break. One wrong character can take the service down."} ],
       point:"A changed setting is a change. It deserves the same care as new code.",
       ex:"Changing one digit in a phone number is a small change. The call still goes to a stranger." },

     { type:"sort", q:"Does this make a change safer or riskier?", buckets:["Safer","Riskier"],
       items:[ {t:"Releasing on Friday at 5 pm and going home", b:1, why:"If it breaks, nobody is there to notice or to undo it."},
               {t:"Releasing when the team is there to watch", b:0, why:"Problems are seen and handled quickly."},
               {t:"A change that can be undone in one minute", b:0, why:"A quick way back keeps a mistake small."},
               {t:"A change that cannot be undone", b:1, why:"Without a way back, every mistake stays until it is repaired."} ],
       point:"A safe change is watched and can be undone.",
       ex:"Painting one wall in a new colour is safe. Knocking the wall down is harder to undo." },

     { type:"choice", q:"True or false: the safest plan is to stop changing the service altogether.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"Users need fixes and improvements, and the world around the service changes anyway. The goal is safe change, not no change."} ],
       point:"No change is not safe either. The goal is to change safely.",
       ex:"A shop that never changes anything is safe until the customers go elsewhere." }
    ]},

  /* ------------------------------------------------------------ 9.2 */
  { id:"l9-2", type:"lesson", code:"9.2", title:"Roll out slowly", sub:"6 questions. A little first, then the rest.",
    intro:{ h:"Try it on a few", p:"Even a tested change can fail with real users. So engineers do not give a new version to everyone at once. They give it to a small group first and watch. If all is well, the group grows. If not, they go back. This is a gradual rollout." },
    take:"Release to a few users first, watch, then widen. Always be able to go back quickly.",
    qs:[
     { type:"choice", q:"A new version is ready. Which way of releasing it is the safest?",
       opts:[ {t:"To 1% of users first, then more", ok:1},
              {t:"To all users at the same time", why:"If it is bad, everyone is hit before anyone can react."},
              {t:"To the biggest customers first", why:"If it fails, your most important customers are hit first. Start with a small, ordinary group."} ],
       point:"Start small. Widen only when the small group is doing well.",
       ex:"You try a new recipe on your family before serving it at a wedding." },

     { type:"choice", q:"Engineers release a new version to a small group first, to see if it is safe. They call this a canary release. What is the small group for?",
       opts:[ {t:"To show problems before everyone is hit", ok:1},
              {t:"To reward loyal users with new things", why:"It is not a reward. The group is there to limit the harm if the new version is bad."},
              {t:"To make the release last longer", why:"Slower is a side effect, not the goal. The goal is to see problems while they are still small."} ],
       point:"A canary limits the harm: if the new version is bad, only a few users notice.",
       ex:"Miners took a canary underground. The bird reacted to bad air before the miners were in danger." },

     { type:"choice", q:"A new version runs for 1% of users. That group gets five times more errors than everyone else. What now?",
       opts:[ {t:"Go back to the old version", ok:1},
              {t:"Continue to 10% and see", why:"Then ten times as many users get the errors. The small group already gave the answer."},
              {t:"Wait a week for more data", why:"The signal is clear already. Waiting only keeps that 1% in trouble for a week."} ],
       point:"When the small group is doing worse, go back. That is what it is for.",
       ex:"If the first spoon tastes burnt, you do not serve the rest." },

     { type:"order", q:"Put the steps of a careful release in order.",
       items:["Test the change","Release it to a small group","Watch errors and speed","Release it to everyone"],
       point:"Test, try on a few, watch, then widen.",
       ex:"A new medicine is tried on a small group first, and only then given to everyone." },

     { type:"choice", q:"Why should a team practise going back to the previous version?",
       opts:[ {t:"So it works when it is needed", ok:1},
              {t:"Because going back has no risks", why:"It can fail too. That is exactly why it must be practised before the day it is needed."},
              {t:"To slow down the pace of releases", why:"The aim is not slower. A team that can undo quickly can release more often, with less fear."} ],
       point:"A way back that was never tried is a hope, not a plan.",
       ex:"A fire drill. The exit you never tried may turn out to be locked." },

     { type:"choice", q:"A new feature causes problems. The team turns it off with a switch, in seconds, without a new release. What is the benefit?",
       opts:[ {t:"The harm stops almost at once", ok:1},
              {t:"The switch repairs the bug", why:"The bug is still there. The switch only keeps it away from users while the team repairs it calmly."},
              {t:"Testing is no longer needed", why:"A switch limits the harm of a mistake. It does not find mistakes for you."} ],
       point:"A switch that turns a feature off is the fastest way back.",
       ex:"You do not rewire the house to turn off a lamp. You use the switch." }
    ]}
 ]},

 { n:10, title:"Built to bend, not break", blurb:"Designing so that one failure does not become a disaster.", nodes:[

  /* ------------------------------------------------------------ 10.1 */
  { id:"l10-1", type:"lesson", code:"10.1", title:"Always a spare", sub:"6 questions. Spares and backups.",
    intro:{ h:"Everything breaks one day", p:"Disks fail. Cables get cut. Whole buildings lose power. A reliable service does not hope this will not happen. It is built so that when one part fails, another takes over. And it keeps copies of its data that have been tested." },
    take:"Have a spare for every important part, in a different place. A backup only counts if restoring it has been tested.",
    qs:[
     { type:"choice", q:"A website runs on one single server. That server breaks. What happens?",
       opts:[ {t:"The whole website is down", ok:1},
              {t:"The server repairs itself", why:"Broken hardware does not repair itself. With one server, there is nothing to take over."},
              {t:"Only half the users notice", why:"Every user needs that one server. When it stops, the site stops for everyone."} ],
       point:"A part that takes everything down when it fails is called a single point of failure.",
       ex:"A village with one bridge. When the bridge closes, nobody gets in or out." },

     { type:"choice", q:"How do engineers remove a single point of failure?",
       opts:[ {t:"Add a spare that takes over", ok:1},
              {t:"Buy a more expensive one", why:"Expensive parts also break, only less often. When it does, everything still stops."},
              {t:"Check it more often", why:"Checking tells you sooner that it broke. It does not keep the service running."} ],
       point:"Two parts that can each do the job: when one fails, the other continues.",
       ex:"A plane has two engines and can fly on one." },

     { type:"choice", q:"A service needs 4 servers for its users. It has 5. One is switched off for maintenance, and then another one breaks. What happens?",
       opts:[ {t:"Too few servers are left", ok:1},
              {t:"Nothing. One spare is enough", why:"The spare was already used by the maintenance. The breakdown leaves 3 servers, and 4 are needed."},
              {t:"The other servers get faster", why:"Servers do not speed up when others stop. Three servers now do the work of four."} ],
       point:"Plan one spare for planned work and one for the unexpected.",
       ex:"A car has one spare tyre. If it is already in use, the next flat tyre stops you." },

     { type:"choice", q:"A company keeps its main system and its spare system in the same building. What is the weak spot?",
       opts:[ {t:"A fire or power cut hits both", ok:1},
              {t:"Two systems cost twice as much", why:"True, but that is the price, not the weakness. The weakness is that one event can take out both."},
              {t:"There is no weak spot", why:"One fire, flood or power cut stops both at once. The spare shares the fate of the original."} ],
       point:"A spare must not share the fate of the original. Put it somewhere else.",
       ex:"Keeping your spare house key inside the house." },

     { type:"choice", q:"A company makes a backup every night. Nobody has ever tried to restore one. How sure can they be of their data?",
       opts:[ {t:"Not sure. It was never tested", ok:1},
              {t:"Very sure. There are many backups", why:"Many copies that cannot be restored are worth nothing. Only a restore shows that a backup works."},
              {t:"Sure enough. Backups rarely fail", why:"Backups fail quietly and often: wrong files, damaged copies. You find out on the day you need them."} ],
       point:"What matters is the restore, not the backup. Test it.",
       ex:"A parachute that has never been checked." },

     { type:"choice", q:"True or false: with enough spare parts, a service can never fail.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"Spares protect against broken parts. They do not protect against a wrong change copied to all of them, or against too many users."} ],
       point:"Spares solve one kind of failure. Changes and overload need other answers.",
       ex:"Two engines do not help when the wrong fuel is in the tank." }
    ]},

  /* ------------------------------------------------------------ 10.2 */
  { id:"l10-2", type:"lesson", code:"10.2", title:"Too much at once", sub:"6 questions. Overload and how to survive it.",
    intro:{ h:"Too much of a good thing", p:"Sometimes a service fails because it is too popular. Too many requests arrive, everything slows down, and then it stops for everyone. A well-built service protects itself: it serves as many users as it can, and tells the rest to come back later." },
    take:"Under overload: serve what you can, refuse the rest quickly, and switch off extras. Retrying blindly makes it worse.",
    qs:[
     { type:"choice", q:"A ticket site can handle 1,000 visitors at once. 5,000 arrive. Which behaviour is best?",
       opts:[ {t:"Serve 1,000 and ask the rest to wait", ok:1},
              {t:"Try to serve all 5,000 at once", why:"Then every visitor gets a page that never loads, and the site may crash for all 5,000."},
              {t:"Close the site until it is quiet", why:"Then nobody is served, though 1,000 visitors could have been helped."} ],
       point:"Serving some users well is better than serving all users badly.",
       ex:"A full restaurant asks new guests to wait. It does not put 300 people on 100 chairs." },

     { type:"choice", q:"A shop website is overloaded. It switches off the 'recommended for you' section, but buying still works. Is this a good idea?",
       opts:[ {t:"Yes. The main job keeps working", ok:1},
              {t:"No. The site must stay complete", why:"Complete and down helps nobody. Losing an extra is better than losing the checkout."},
              {t:"No. It will confuse customers", why:"Most customers will not notice. All of them would notice a checkout that fails."} ],
       point:"Under pressure, drop the extras to protect the main job.",
       ex:"In a storm, a ship throws cargo overboard to stay afloat." },

     { type:"choice", q:"An app fails to load. It tries again immediately, and so do a million other phones, again and again. What happens to the overloaded service?",
       opts:[ {t:"It gets even more overloaded", ok:1},
              {t:"It recovers more quickly", why:"Each retry is an extra request. The service now has even more work than before."},
              {t:"Nothing changes for it", why:"Every retry adds load. A million phones trying again and again multiply the problem."} ],
       point:"Retrying at once, all together, turns a small problem into a large one.",
       ex:"When a phone line is busy and everyone redials every second, nobody gets through." },

     { type:"choice", q:"What is a kinder way for an app to try again after a failure?",
       opts:[ {t:"Wait longer before each new try", ok:1},
              {t:"Retry as fast as possible", why:"That adds load exactly when the service has too much already."},
              {t:"Never try again at all", why:"Then one short problem becomes a failure for the user. Retrying is fine, with patience."} ],
       point:"Retry with growing pauses. That gives the service room to recover.",
       ex:"If a shop is closed, you come back in an hour, not every ten seconds." },

     { type:"choice", q:"Three servers share the work. One fails, so the other two get more work. Then the second fails from overload. What is likely to happen next?",
       opts:[ {t:"The last one fails too", ok:1},
              {t:"The last one handles it all", why:"Two could not carry the load. One certainly cannot."},
              {t:"The work spreads out evenly", why:"It already did, and that is the problem: each failure puts more load on those that remain."} ],
       point:"Overload can spread from part to part until everything is down. Engineers call it a cascading failure.",
       ex:"A row of dominoes." },

     { type:"sort", q:"A service is overloaded. Does this help, or make it worse?", buckets:["Helps","Makes it worse"],
       items:[ {t:"Refusing extra requests quickly", b:0, why:"A quick 'no' costs little and keeps the service alive for the others."},
               {t:"Every app retrying at the same moment", b:1, why:"All those retries arrive as one new wave of load."},
               {t:"Switching off features that are not essential", b:0, why:"That frees capacity for the main job."},
               {t:"Letting requests wait without a time limit", b:1, why:"Waiting requests pile up and use capacity. A quick 'no' is kinder than an endless wait."} ],
       point:"Refuse quickly, drop extras, and never let work pile up without limit.",
       ex:"A lifeboat takes as many people as it can carry. One more and everyone is in the water." }
    ]}
 ]},

 { n:11, title:"Teams and trust", blurb:"How the people who build and the people who run work together.", nodes:[

  /* ------------------------------------------------------------ 11.1 */
  { id:"l11-1", type:"lesson", code:"11.1", title:"Builders and runners", sub:"6 questions. Two goals, one agreement.",
    intro:{ h:"Faster or safer?", p:"Developers are asked to deliver new features fast. Operators are asked to keep things stable. Those goals pull in opposite directions, and for years the result was conflict. SRE, site reliability engineering, is a way of working that ends the conflict with shared numbers and shared responsibility." },
    take:"Speed and stability are one shared goal. The error budget is the agreement that makes it work.",
    qs:[
     { type:"choice", q:"Developers want to release often. Operators want few changes, because changes cause incidents. What is the root of this conflict?",
       opts:[ {t:"They are judged on opposite goals", ok:1},
              {t:"Developers do not care about users", why:"Both groups care. The problem is the setup: one is rewarded for speed, the other for stability."},
              {t:"Operators dislike new things", why:"Operators are not against new things. They are judged on stability, and every change puts that at risk."} ],
       point:"When two teams are rewarded for opposite things, they will fight. Change the setup, not the people.",
       ex:"A driver paid per delivery and a mechanic paid for cars without damage." },

     { type:"choice", q:"What does SRE stand for?",
       opts:[ {t:"Site reliability engineering", ok:1},
              {t:"Software release engineering", why:"Releases are a part of it, but the R stands for reliability."},
              {t:"System repair expertise", why:"Repair is a small part. The E stands for engineering: building things so that less repair is needed."} ],
       point:"SRE: site reliability engineering. It treats running a service as an engineering problem.",
       ex:"Instead of mopping the floor every day, an engineer repairs the leak." },

     { type:"choice", q:"How does an error budget help developers and operators to work together?",
       opts:[ {t:"It is one number both have agreed on", ok:1},
              {t:"It gives operators the final word", why:"Nobody gets the final word. The agreed number decides, and both teams accepted it in advance."},
              {t:"It lets developers ignore failures", why:"The opposite: when the budget is gone, developers stop releasing and help to repair."} ],
       point:"A shared number replaces the argument. Budget left: release. Budget gone: repair.",
       ex:"Housemates who agree on a cleaning schedule argue less about who cleans." },

     { type:"choice", q:"A developer says: 'I write the code. Whether it runs well is the operators' problem.' What is wrong with this view?",
       opts:[ {t:"Reliability starts in how it is built", ok:1},
              {t:"Nothing. That is a fair division", why:"Operators cannot make badly built software reliable. Most reliability is decided in design and code."},
              {t:"Operators should write the code too", why:"Roles can differ. What matters is that the people who build also feel responsible for how it runs."} ],
       point:"Those who build a service share the responsibility for how it runs.",
       ex:"An architect who says a leaking roof is the caretaker's problem." },

     { type:"choice", q:"An SRE team spends all its time on manual operations. No time is left to improve anything. What does the SRE approach say?",
       opts:[ {t:"Hand some work back to developers", ok:1},
              {t:"Hire until the work is covered", why:"More people doing manual work only moves the limit. The work keeps growing with the service."},
              {t:"Accept it. Operations is the job", why:"Then nothing ever improves. The SRE approach protects time for engineering."} ],
       point:"SRE teams protect time for engineering. Extra operational work goes back to the developers, who then feel what unreliable software costs.",
       ex:"If the kitchen cannot keep up, the waiters stop taking new orders for a while." },

     { type:"choice", q:"True or false: reliability is the job of one special team only.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"A reliability team helps and advises. But every decision in design and development affects reliability."} ],
       point:"Reliability is everyone's work. A reliability team makes it easier, not unnecessary.",
       ex:"A hospital has hygiene experts. Every nurse still washes their hands." }
    ]},

  /* ------------------------------------------------------------ 11.2 */
  { id:"l11-2", type:"lesson", code:"11.2", title:"Ready for launch", sub:"6 questions. Before it goes live.",
    intro:{ h:"Before the doors open", p:"A new service brings new risks. Before it goes live, good teams check that it can be run: Can we see what it does? Is there an alert? A way back? Someone on call? This check is called a production readiness review. Its goal is to help the launch, not to block it." },
    take:"Before launch: can we see it, be alerted, undo it and support it? A checklist helps, as advice and not as a wall.",
    qs:[
     { type:"choice", q:"A new service is about to go live. What should the team check first?",
       opts:[ {t:"That problems will be noticed", ok:1},
              {t:"That every planned feature is in", why:"Missing features can be added later. A service that fails without anyone noticing cannot be saved in time."},
              {t:"That the code is as short as possible", why:"Short code is nice. But first you need to know that you will see it when something goes wrong."} ],
       point:"A service you cannot see into is not ready to go live.",
       ex:"You do not open a shop before the smoke detectors work." },

     { type:"sort", q:"Is this service ready for launch?", buckets:["Ready","Not ready"],
       items:[ {t:"There is an alert for when users are affected", b:0, why:"Problems will be noticed."},
               {t:"Nobody knows how to undo a release", b:1, why:"Without a way back, a bad release stays live."},
               {t:"An objective has been agreed", b:0, why:"The team knows what 'good enough' means."},
               {t:"Nobody is on call for it", b:1, why:"An alert without a person to receive it helps nobody."} ],
       point:"Ready means: seen, alerted, reversible and supported.",
       ex:"A ship leaves the harbour with lifeboats, a radio and a crew that knows the drill." },

     { type:"choice", q:"Why do teams use a written checklist before every launch?",
       opts:[ {t:"People forget steps under pressure", ok:1},
              {t:"To make launches take longer", why:"A checklist takes minutes. A forgotten step can take the service down for hours."},
              {t:"Because a signature is required", why:"A checklist that is only signed is useless. Its value is in the steps that would have been forgotten."} ],
       point:"A checklist carries the lessons of earlier launches into the next one.",
       ex:"Pilots with thousands of flights still read the checklist before every one." },

     { type:"choice", q:"A reliability team has the power to say 'no' to every launch, and uses it often. What tends to happen?",
       opts:[ {t:"Teams start to work around them", ok:1},
              {t:"Everything becomes more reliable", why:"For a while, maybe. But teams that feel blocked stop asking, and launch without any advice."},
              {t:"Launches become faster", why:"The opposite. Every launch waits for approval, and teams look for ways to avoid the wait."} ],
       point:"Reliability advice works best as help, early in the design. A late 'no' teaches teams to avoid you.",
       ex:"A building inspector who only appears on opening day finds problems when they are most expensive to fix." },

     { type:"choice", q:"An SRE team runs a service for a developer team. It keeps missing its objective, and the developers do not fix it. What can the SRE team fairly do?",
       opts:[ {t:"Hand on-call back to the developers", ok:1},
              {t:"Keep absorbing the extra work", why:"Then nothing changes. The developers never feel the cost, and the SRE team burns out."},
              {t:"Switch the service off", why:"That punishes the users. The fair step is to return the on-call duty until the service improves."} ],
       point:"Support has conditions. If a service stays unreliable, the people who build it carry the alerts until it improves.",
       ex:"A garage can stop giving a guarantee on a car whose owner never follows the advice." },

     { type:"choice", q:"A big launch is planned for the busiest day of the year. What is the sensible view?",
       opts:[ {t:"Choose a quieter day", ok:1},
              {t:"A busy day is the best test", why:"If it fails, it fails with the most users watching and the least room to recover."},
              {t:"The date does not matter", why:"The same mistake costs far more on a day when everyone is using the service."} ],
       point:"Launch when a mistake costs the least and the team has time to react.",
       ex:"You do not try a new route on the morning of an important exam." }
    ]},

  /* ------------------------------------------------------------ Checkpoint E */
  { id:"x-e", type:"exam", code:"E", title:"Checkpoint E", sub:"10 questions. Pass mark 80%. Earns the rank Practitioner.", pass:80,
    intro:{ h:"Checkpoint E", p:"Ten questions on safe change, resilient design and teams. No second tries, but you still get the explanation after each answer. You need 8 out of 10 to pass." },
    qs:[
     { from:"l9-1", type:"choice", q:"A stable service suddenly breaks. What is the most likely trigger?",
       opts:[ {t:"A recent change", ok:1},
              {t:"The age of the servers", why:"Old parts fail now and then. But most incidents follow a change someone made."},
              {t:"The time of day", why:"The clock rarely breaks things. A change usually does."} ],
       point:"Start by asking what changed.",
       ex:"The printer worked until someone installed the update." },

     { from:"l9-1", type:"choice", q:"True or false: changing a setting is as much a change as releasing new code.",
       opts:[ {t:"True", ok:1},
              {t:"False", why:"A wrong setting can stop a whole service. It deserves the same care as code."} ],
       point:"A setting is a change. Test it, release it carefully, be able to undo it.",
       ex:"One wrong digit in a bank account number sends the money somewhere else." },

     { from:"l9-2", type:"choice", q:"What is a canary release?",
       opts:[ {t:"A new version for a small group first", ok:1},
              {t:"A release without any testing", why:"A canary comes after testing. It is an extra safety step with real users."},
              {t:"A version only for the developers", why:"Developers test earlier. A canary goes to a small group of real users."} ],
       point:"Canary: try on a few before giving it to all.",
       ex:"Tasting one spoon before serving the pot." },

     { from:"l9-2", type:"choice", q:"The small test group gets many more errors with the new version. What is the right step?",
       opts:[ {t:"Go back to the old version", ok:1},
              {t:"Release it to more users", why:"That spreads the errors to more people. The small group already gave the answer."},
              {t:"Leave it as it is for now", why:"Then the small group stays in trouble. Go back first, then investigate."} ],
       point:"A bad canary means: go back.",
       ex:"If the first slice of bread is mouldy, you do not make sandwiches for everyone." },

     { from:"l10-1", type:"choice", q:"What is a single point of failure?",
       opts:[ {t:"A part whose failure stops it all", ok:1},
              {t:"The first failure of the day", why:"It is not about when. It is about a part that has no spare, so everything depends on it."},
              {t:"A failure seen by only one user", why:"It is the opposite: when this part fails, every user is affected."} ],
       point:"No spare, and everything depends on it: a single point of failure.",
       ex:"The only key to the office, carried by one person." },

     { from:"l10-1", type:"choice", q:"When does a backup count as reliable?",
       opts:[ {t:"When restoring it has been tested", ok:1},
              {t:"When it is made every night", why:"A nightly backup that cannot be restored is worth nothing."},
              {t:"When it is stored in two places", why:"Two copies that cannot be restored are worth nothing. Only a test shows that they work."} ],
       point:"Only a tested restore proves a backup.",
       ex:"A spare tyre is only useful if there is air in it." },

     { from:"l10-2", type:"choice", q:"A service gets far more requests than it can handle. What protects it best?",
       opts:[ {t:"Refusing the extra requests quickly", ok:1},
              {t:"Accepting every request anyway", why:"Then all requests get slow and the service may stop for everyone."},
              {t:"Making every request wait longer", why:"Waiting requests pile up and use capacity. That makes the overload worse."} ],
       point:"A quick 'no' to some keeps the service alive for the rest.",
       ex:"A full car park closes its gate. It does not let cars block every lane." },

     { from:"l10-2", type:"sort", q:"A service is overloaded. Does this help, or make it worse?", buckets:["Helps","Makes it worse"],
       items:[ {t:"Apps wait a little longer before each retry", b:0, why:"That gives the service room to recover."},
               {t:"All apps retry at the same moment", b:1, why:"The retries arrive as one new wave of load."},
               {t:"Extras are switched off to protect the main job", b:0, why:"That frees capacity for what matters most."},
               {t:"A failed part passes all its work to one neighbour", b:1, why:"The neighbour is overloaded next. That is how failures spread."} ],
       point:"Reduce the load. Never add to it.",
       ex:"In a traffic jam, closing the entrance helps. Sending in more cars does not." },

     { from:"l11-1", type:"choice", q:"What ends the argument between 'release faster' and 'keep it stable'?",
       opts:[ {t:"A shared error budget", ok:1},
              {t:"A stricter manager", why:"Then the argument is settled by rank, not by what users experience."},
              {t:"A longer test phase", why:"Testing helps, but it does not answer how much risk is acceptable. The budget does."} ],
       point:"An agreed number decides how much risk can be taken.",
       ex:"A household budget ends the argument about whether you can afford the holiday." },

     { from:"l11-2", type:"choice", q:"Before a launch, which question matters most for reliability?",
       opts:[ {t:"Can we see and undo problems?", ok:1},
              {t:"Is the design modern enough?", why:"Modern says nothing about whether you will notice a failure or be able to go back."},
              {t:"Did we add enough features?", why:"Features can come later. Seeing and undoing problems must be there from the first day."} ],
       point:"See it, be alerted, undo it, support it.",
       ex:"Before a long drive you check the brakes, not the radio." }
    ]}
 ]},

 { n:12, title:"The hard parts", blurb:"Where simple rules stop working and judgement begins.", nodes:[

  /* ------------------------------------------------------------ 12.1 */
  { id:"l12-1", type:"lesson", code:"12.1", title:"When numbers mislead", sub:"6 questions. Averages, wrong measures and false comfort.",
    intro:{ h:"A number is not the truth", p:"By now you trust numbers more than feelings. Good. But numbers can mislead too. An average can hide the users who suffer. A green objective can sit next to unhappy customers. This stop is about reading numbers with care." },
    take:"Averages hide the unlucky users. If the objective is met and users are unhappy, the measure is wrong, not the users.",
    qs:[
     { type:"choice", q:"Nine pages open in 1 second. The tenth takes 91 seconds. The average is 10 seconds. What does the average hide?",
       opts:[ {t:"One user had a terrible wait", ok:1},
              {t:"Most users waited 10 seconds", why:"Nobody waited 10 seconds. Nine users waited 1 second and one waited 91."},
              {t:"The site is slow for everyone", why:"For nine out of ten users it was fast. The average hides that, and it hides the one who suffered."} ],
       point:"An average can describe nobody. Look at the slowest users separately.",
       ex:"With one foot in ice water and one in boiling water, on average you are comfortable." },

     { type:"choice", q:"A team reports: '99 out of 100 pages open within 2 seconds.' Why is that more useful than an average?",
       opts:[ {t:"It covers nearly all users", ok:1},
              {t:"It is a larger number", why:"Size is not the point. The point is that it says how many users got a good result."},
              {t:"It is easier to calculate", why:"It is harder to calculate. It is more useful because slow pages cannot hide in it."} ],
       point:"Say how many users get a good result. Slow cases cannot hide in that number.",
       ex:"'Most trains arrive within 5 minutes of the timetable' tells you more than 'the average delay is 3 minutes'." },

     { type:"choice", q:"The objective is met: 99.9% of requests succeed. Still, customers complain every day that they cannot pay. What is the best conclusion?",
       opts:[ {t:"The measure misses what users do", ok:1},
              {t:"The customers are exaggerating", why:"Daily complaints are a signal. When users and numbers disagree, check the numbers first."},
              {t:"The objective should be lower", why:"A lower target changes nothing for customers. The problem is what is being measured."} ],
       point:"When numbers and users disagree, the numbers measure the wrong thing.",
       ex:"A restaurant counts plates served and is proud. The guests were counting how long they waited." },

     { type:"choice", q:"A team is rewarded for closing tickets fast. Soon they close tickets without solving them. What went wrong?",
       opts:[ {t:"The number became the goal", ok:1},
              {t:"The team is dishonest", why:"People do what they are rewarded for. The reward pointed at the number, not at solved problems."},
              {t:"The tickets were too hard", why:"Nothing says they were hard. The team was pushed to close them, not to solve them."} ],
       point:"A measure that becomes a target stops measuring what you care about.",
       ex:"A school that only teaches what is in the exam." },

     { type:"choice", q:"True or false: if all the graphs are green, the users are certainly happy.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"Graphs only show what somebody chose to measure. Users can be let down in ways nobody thought of."} ],
       point:"Green graphs mean the measured things are fine. Keep listening to users.",
       ex:"All the lights on the dashboard are off, and the car still makes a strange noise." },

     { type:"choice", q:"A small service gets 10 requests a day. One fails, and the score for that day drops to 90%. How should the team read this?",
       opts:[ {t:"With care. One failure moves it a lot", ok:1},
              {t:"As a disaster. 90% is terrible", why:"With only 10 requests, one failure already gives 90%. The number looks worse than the situation is."},
              {t:"As proof the objective is wrong", why:"One day says little. Look at a longer period before changing the objective."} ],
       point:"With few requests, a percentage jumps on a single failure. Look at a longer period.",
       ex:"A football player who has taken one penalty and missed has scored 0%. That says little." }
    ]},

  /* ------------------------------------------------------------ 12.2 */
  { id:"l12-2", type:"lesson", code:"12.2", title:"Hard choices", sub:"6 questions. Dependencies, promises and pressure.",
    intro:{ h:"No rule decides this for you", p:"Real services depend on other services. Customers get promises in contracts. And sometimes the budget is gone while the business needs a launch. There is no formula here. There are principles, and judgement." },
    take:"You are at most as reliable as what you depend on. Promise customers less than you aim for. And keep things simple.",
    qs:[
     { type:"choice", q:"A shop needs a payment company to work. The payment company works 99% of the time. Can the shop's checkout reach 99.9%?",
       opts:[ {t:"No. Not with this dependency", ok:1},
              {t:"Yes, with good enough code", why:"No code can take a payment while the payment company is down."},
              {t:"Yes, with more servers", why:"More servers do not help when the part that fails belongs to someone else."} ],
       point:"A service is at most as reliable as the things it cannot work without.",
       ex:"A chain is as strong as its weakest link." },

     { type:"choice", q:"A shop depends on one payment company that works 99% of the time. The shop wants its checkout to reach 99.9%. What could make that possible?",
       opts:[ {t:"A second payment company as backup", ok:1},
              {t:"A faster website with more servers", why:"The website is not the weak part. The single payment company is."},
              {t:"A stricter objective for the team", why:"Writing down a higher number does not make the payment company fail less."} ],
       point:"Either remove the dependency, or have a second one that can take over.",
       ex:"A hospital has its own generator, because it cannot depend on the power grid alone." },

     { type:"choice", q:"A contract promises customers 99%, with money back below that. Inside the company, the team aims for 99.9%. Why aim higher than the promise?",
       opts:[ {t:"To keep a margin for bad months", ok:1},
              {t:"To impress the customers", why:"Customers only see the contract. The higher aim is a safety margin inside the company."},
              {t:"Because the contract is wrong", why:"The contract is on purpose the safer number. Breaking it costs money, so the team aims well above it."} ],
       point:"The promise in a contract is called an SLA. The objective inside the company should be stricter, so there is a margin.",
       ex:"You tell friends you will arrive at eight, and you plan to be there at a quarter to." },

     { type:"choice", q:"The error budget is gone. A launch cannot be moved, because the law sets the date. What is the most sensible approach?",
       opts:[ {t:"Launch with extra care, then repair", ok:1},
              {t:"Refuse. The budget rule is absolute", why:"The budget is a tool for good decisions, not a law of nature. A legal deadline is a real reason for an exception."},
              {t:"Launch as usual and ignore the budget", why:"The risk is real. An exception should be open, agreed and handled with extra care, not ignored."} ],
       point:"The error budget guides decisions. Exceptions are possible when they are open, agreed and rare.",
       ex:"A doctor follows the guidelines, and knows when a patient is the exception." },

     { type:"choice", q:"Two designs do the same job. One has 5 parts, the other has 50. Which is likely to be more reliable?",
       opts:[ {t:"The one with 5 parts", ok:1},
              {t:"The one with 50 parts", why:"Every part can fail and every connection can go wrong. More parts, more ways to break."},
              {t:"There is no difference", why:"Fewer parts means fewer things that can fail, and less to understand during an incident."} ],
       point:"Simple systems have fewer ways to fail and are easier to repair.",
       ex:"A bicycle breaks down less often than a helicopter." },

     { type:"choice", q:"True or false: there is one reliability target that is right for every service.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"A heart monitor and a photo app need very different targets. The right number depends on the users and on the harm a failure does."} ],
       point:"The right target depends on the users, the harm and the cost. It is a choice, made again for each service.",
       ex:"Shoes come in sizes. So do reliability targets." }
    ]}
 ]},

 { n:13, title:"AI at the controls", blurb:"What changes when AI helps to run systems, and what must not change.", nodes:[

  /* ------------------------------------------------------------ 13.1 */
  { id:"l13-1", type:"lesson", code:"13.1", title:"AI as a helper", sub:"6 questions. What AI is good at, and where it goes wrong.",
    intro:{ h:"A new colleague", p:"AI can now read alerts, search through records and suggest what is wrong, within seconds. That makes it a strong helper during incidents. It can also be wrong while sounding very sure. So the question is not whether to use it, but how much to let it do." },
    take:"AI is a fast helper for finding and summarising. It can be wrong with full confidence, so check what matters.",
    qs:[
     { type:"choice", q:"An alert rings at night. Within two minutes, an AI adds: recent changes, similar incidents from the past, and a possible cause. What is the value of this?",
       opts:[ {t:"The engineer starts with context", ok:1},
              {t:"The engineer is no longer needed", why:"The AI collected information. A person still judges whether the suggestion is right and what to do."},
              {t:"The problem is now solved", why:"Nothing has been repaired yet. The AI only made the start of the work faster."} ],
       point:"AI is good at gathering context fast. That saves the first, slowest minutes.",
       ex:"A nurse who has the file, the test results and the history ready when the doctor walks in." },

     { type:"sort", q:"Is this a good task for AI today, or does it need a human decision?", buckets:["Good task for AI","Needs a human decision"],
       items:[ {t:"Summarising 5,000 lines of records", b:0, why:"Reading a lot and summarising it is fast, safe work for AI."},
               {t:"Finding similar incidents from the past", b:0, why:"Searching and comparing is what AI does well."},
               {t:"Switching a service off for all customers", b:1, why:"The effect is large and hard to undo. A person must decide and answer for it."},
               {t:"Accepting the risk of a repair that was never tested", b:1, why:"Weighing a risk for the business is a human responsibility."} ],
       point:"Let AI read, search and suggest. Keep large, risky decisions with people.",
       ex:"A calculator does the sums. You decide whether to buy the house." },

     { type:"choice", q:"An AI says, with great confidence: 'The cause is the database.' What should the engineer do before acting on it?",
       opts:[ {t:"Check the evidence behind it", ok:1},
              {t:"Act at once. It sounded sure", why:"AI can sound sure and be wrong. Acting on a wrong cause can make the incident worse."},
              {t:"Ignore it. AI is always wrong", why:"It is often right, and fast. Throwing that away wastes time. Check it, then use it."} ],
       point:"Sounding sure and being right are different things. Ask for the evidence.",
       ex:"A navigation app that confidently sends you into a closed road." },

     { type:"choice", q:"Two AI helpers give the same advice. Helper A shows which signals it looked at and why. Helper B shows only the answer. Which is safer to work with?",
       opts:[ {t:"A. Its reasoning can be checked", ok:1},
              {t:"B. It wastes less of your time", why:"A short answer you cannot check saves no time. You either trust it blindly or redo the work."},
              {t:"Both are equally safe", why:"Only the reasoning of A can be checked. With B, you cannot tell a good answer from a lucky guess."} ],
       point:"An AI that shows its reasoning can be checked, and trusted step by step.",
       ex:"A maths teacher asks pupils to show their working, not only the answer." },

     { type:"choice", q:"A team lets AI handle all small incidents for a year. Then a large incident of a new kind arrives. What is the risk?",
       opts:[ {t:"The team is out of practice", ok:1},
              {t:"The AI has run out of knowledge", why:"AI does not run out. The risk is on the human side: skills that are not used fade."},
              {t:"None. All incidents are alike", why:"New kinds of failure need judgement and experience. A year without practice wears both down."} ],
       point:"People stay sharp by practising. If AI does the routine work, practise on purpose.",
       ex:"Pilots train in simulators, because the autopilot does most of the flying." },

     { type:"choice", q:"True or false: an AI that was right 50 times will certainly be right the next time.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"Systems change, and so do the problems. Past success builds trust, not certainty. Keep checking."} ],
       point:"A good record earns trust. It never replaces checking.",
       ex:"A bridge that has stood for 50 years still gets inspected." }
    ]},

  /* ------------------------------------------------------------ 13.2 */
  { id:"l13-2", type:"lesson", code:"13.2", title:"Humans in charge", sub:"6 questions. Limits, approval and the stop button.",
    intro:{ h:"How much may it do?", p:"An AI that only gives advice can do little harm. An AI that changes live systems can do a lot of harm, very fast. So freedom is given in steps: first only reading, then acting with approval, then acting alone on small, well-known problems. And there is always a way to stop it." },
    take:"Give AI freedom in steps, as it proves itself. Keep limits, a record of every action, and a stop button. People stay accountable.",
    qs:[
     { type:"order", q:"Put these ways of using AI in order. Start with the one where people do the most.",
       items:["AI only gathers information","AI suggests, a person carries it out","AI acts after a person approves","AI acts alone on small, known problems"],
       point:"Freedom grows in steps. Each step is earned by proven results.",
       ex:"A learner driver: first watching, then driving with an instructor, then alone on quiet roads." },

     { type:"choice", q:"A new AI agent is able to repair problems in a live system. What is the safest way to start using it?",
       opts:[ {t:"Read-only first: it may look, not act", ok:1},
              {t:"Full control, to see what it can do", why:"Then its first mistake happens on the live system, at full speed."},
              {t:"Only at night, when it is quiet", why:"A mistake at night is still a mistake, with fewer people awake to notice."} ],
       point:"Start with looking only. Let the agent earn the right to act.",
       ex:"A new employee watches for a week before getting the keys." },

     { type:"choice", q:"An AI agent has one job: restarting stuck programs. Which permissions should it get?",
       opts:[ {t:"Only what restarting needs", ok:1},
              {t:"Everything, in case it needs more", why:"Then one mistake can reach everything. Small permissions keep a mistake small."},
              {t:"The same as a senior engineer", why:"A senior engineer can change almost anything. The agent only restarts programs, so that is all it should be able to do."} ],
       point:"Give an agent only the access its task needs. Then a mistake stays small.",
       ex:"A window cleaner gets the key to the building, not the code to the safe." },

     { type:"choice", q:"An AI agent starts making changes that are clearly making things worse. What must the team have ready?",
       opts:[ {t:"A way to stop it at once", ok:1},
              {t:"A report form for later", why:"A report helps afterwards. Right now the damage is growing every second."},
              {t:"A second AI to argue with it", why:"Two systems arguing does not stop the damage. A person needs a button that does."} ],
       point:"Automation that acts must be easy to interrupt. Build the stop button first.",
       ex:"Every factory machine has a red emergency stop." },

     { type:"choice", q:"An AI agent changed a setting last night. In the morning, nobody can find out what it did or why. What was missing?",
       opts:[ {t:"A record of every action", ok:1},
              {t:"A faster and smarter AI model", why:"A smarter model that leaves no trace is just as impossible to check."},
              {t:"More engineers on the night shift", why:"More people would not know either. The agent itself must write down what it does and why."} ],
       point:"Every action of an agent is recorded: what, when and why. And a person stays accountable.",
       ex:"A ship's log: whoever is at the wheel, every change of course is written down." },

     { type:"choice", q:"An AI agent wants to restart a server. Which fact should make it stop and ask a person first?",
       opts:[ {t:"A large incident is already going on", ok:1},
              {t:"The server was restarted last month", why:"That is normal and says little. What matters is the situation right now."},
              {t:"The server has an unusual name", why:"A name is not a risk. What matters is what else is happening at this moment."} ],
       point:"The same action can be safe on a calm day and dangerous during an incident. Check the situation first.",
       ex:"Overtaking is fine on an empty road and deadly in fog." }
    ]},

  /* ------------------------------------------------------------ Final exam */
  { id:"x-final", type:"exam", code:"F", title:"Final exam", sub:"20 questions. Pass mark 80%. Earns the rank Reliability Engineer.", pass:80,
    intro:{ h:"Final exam", p:"Twenty questions on the whole course, in a mixed order. No second tries, but you still get the explanation after each answer. You need 16 out of 20 to pass." },
    qs:[
     { from:"l1-1", type:"choice", q:"A company says its systems run perfectly. Customers say they cannot order. What decides whether the service works?",
       opts:[ {t:"The customers' experience", ok:1},
              {t:"The company's own screens", why:"Screens show what somebody chose to measure. The customers show what really happens."},
              {t:"The latest test results", why:"Tests are done before release. They do not show what customers experience right now."} ],
       point:"A service works when its users get what they came for.",
       ex:"A restaurant is judged at the table, not in the kitchen." },

     { from:"l1-2", type:"sort", q:"Which kind of failure is each of these?", buckets:["Error","Too slow","Wrong answer"],
       items:[ {t:"A bank app shows last week's balance", b:2, why:"No error and no waiting, but the number is not true."},
               {t:"A page says: 'Try again later'", b:0, why:"The site refused. That is an error."},
               {t:"A video needs a minute to start", b:1, why:"It works, but far too late."},
               {t:"A search shows results for another word", b:2, why:"It answered quickly, and the answer was wrong."} ],
       point:"Three ways to fail: saying no, making you wait, telling you something wrong.",
       ex:"A closed door, a long queue, or the wrong parcel." },

     { from:"l2-1", type:"choice", q:"'97% of payments went through last week.' What kind of number is this?",
       opts:[ {t:"An indicator (SLI)", ok:1},
              {t:"An objective (SLO)", why:"An objective says what should happen. This says what did happen."},
              {t:"An error budget", why:"The budget is the share that may fail. This is the share that worked."} ],
       point:"What was measured is the indicator.",
       ex:"The speedometer, not the speed limit." },

     { from:"l2-2", type:"choice", q:"Why is 100% the wrong objective?",
       opts:[ {t:"It can never be reached", ok:1},
              {t:"It is too easy to reach", why:"The opposite. Nothing built by people works every single time."},
              {t:"Users prefer some failures", why:"Users do not want failures. But they cannot feel the last small step, and it costs far too much."} ],
       point:"100% is impossible, far too expensive to chase, and leaves no room for change.",
       ex:"No airline promises that every flight leaves on time." },

     { from:"l2-3", type:"choice", q:"An app is used 100,000 times this month. The objective is 99.9%. How many tries may fail?",
       opts:[ {t:"100", ok:1},
              {t:"1,000", why:"That would be 1%. The budget here is 0.1%: 100 out of 100,000."},
              {t:"10", why:"That would be 0.01%. The budget here is 0.1%: 100 out of 100,000."} ],
       point:"Error budget = 100% minus the objective. Here: 0.1% of 100,000 is 100.",
       ex:"One out of 1,000 tickets may be lost. For 100,000 tickets, that is 100." },

     { from:"l2-4", type:"choice", q:"The error budget is used up. What should the team do first?",
       opts:[ {t:"Pause risky releases", ok:1},
              {t:"Raise the error budget", why:"That hides the problem. Users are already getting less than was agreed."},
              {t:"Release faster to catch up", why:"More releases add more risk, exactly when there is no room left for failures."} ],
       point:"Budget gone: stop adding risk and repair.",
       ex:"When the fuel light is on, you drive to the petrol station first." },

     { from:"l3-2", type:"choice", q:"'The app is slow' and 'a disk is failing'. Which one is the symptom?",
       opts:[ {t:"The app is slow", ok:1},
              {t:"A disk is failing", why:"Users do not see the disk. It is the reason behind what they feel."},
              {t:"Both of them", why:"Users feel only the slow app. The disk is the cause."} ],
       point:"Symptom: what users feel. Cause: why.",
       ex:"The headache and the missed glass of water." },

     { from:"l4-1", type:"choice", q:"What must be true before an alert may wake someone at night?",
       opts:[ {t:"A person must act now", ok:1},
              {t:"A number has changed", why:"Numbers change all the time. That alone is no reason to wake anyone."},
              {t:"A machine is busy", why:"Busy machines are normal. It matters only when users are affected and someone must act."} ],
       point:"An alert is for things that need a person, now.",
       ex:"The fire alarm, not the weather report." },

     { from:"l4-2", type:"choice", q:"An alert rings every day and is always harmless. What should happen to it?",
       opts:[ {t:"Fix it or remove it", ok:1},
              {t:"Keep it to be safe", why:"It teaches the team to ignore alerts. On the day it is real, nobody reacts."},
              {t:"Send it to everyone", why:"That spreads the noise and teaches more people to ignore it."} ],
       point:"A noisy alert is a fault. Repair it.",
       ex:"A smoke detector that beeps for every piece of toast ends up without a battery." },

     { from:"l5-1", type:"choice", q:"What is toil?",
       opts:[ {t:"Repeated manual work", ok:1},
              {t:"Any work that is difficult", why:"Toil is often easy. What makes it toil is that it is manual and keeps returning."},
              {t:"Work outside office hours", why:"The hour does not matter. Toil is manual, repeated work that a machine could do."} ],
       point:"Toil: manual, repeated, and leaving nothing better behind.",
       ex:"Carrying water from the well every day, instead of laying a pipe." },

     { from:"l6-1", type:"choice", q:"An on-call engineer cannot solve a problem alone. What is the professional thing to do?",
       opts:[ {t:"Ask for help early", ok:1},
              {t:"Keep trying in silence", why:"Users pay for every extra minute. Asking for help is part of the job."},
              {t:"Wait for the next shift", why:"Users are affected now. Waiting adds hours of harm."} ],
       point:"Escalating early is a strength.",
       ex:"A lifeguard calls for backup while swimming out." },

     { from:"l7-1", type:"order", q:"An incident starts. Put the steps in order.",
       items:["See that users are affected","Stop the harm","Understand the cause","Prevent a repeat"],
       point:"Notice, stop the harm, understand, prevent.",
       ex:"A kitchen fire: see it, put it out, find out how it started, cook differently." },

     { from:"l8-2", type:"choice", q:"What does 'blameless' mean in an incident review?",
       opts:[ {t:"Asking how the system allowed it", ok:1},
              {t:"Nobody is responsible for anything", why:"People stay responsible for improving things. Blameless means mistakes lead to learning, not punishment."},
              {t:"The cause is never written down", why:"Causes are written down carefully. What is left out is blame for a person."} ],
       point:"Repair the system instead of blaming the person.",
       ex:"If ten people slip on the same stairs, repair the stairs." },

     { from:"l9-2", type:"choice", q:"Why release a new version to 1% of users first?",
       opts:[ {t:"A bad version harms few people", ok:1},
              {t:"Those users asked for it first", why:"The group is not chosen as a favour. It is there to limit the harm if the version is bad."},
              {t:"It makes the release cheaper", why:"Cost is not the reason. The reason is to see problems while they are still small."} ],
       point:"Start small, watch, then widen.",
       ex:"Tasting one spoon before serving the pot." },

     { from:"l10-1", type:"choice", q:"A company keeps its spare system in the same building as the main one. What is the problem?",
       opts:[ {t:"One event can take out both", ok:1},
              {t:"Spare systems are never needed", why:"They are needed on the worst day. That is why they must survive what stops the main system."},
              {t:"The spare will wear out faster", why:"Wear is not the issue. A fire or power cut in that building stops both at once."} ],
       point:"A spare must not share the fate of the original.",
       ex:"The spare house key, kept inside the house." },

     { from:"l11-1", type:"choice", q:"True or false: reliability is only the job of the operations team.",
       opts:[ {t:"False", ok:1},
              {t:"True", why:"Most reliability is decided in design and code. Everyone who builds the service shares the responsibility."} ],
       point:"Reliability is everyone's work.",
       ex:"Every nurse washes their hands, even though the hospital has hygiene experts." },

     { from:"l12-1", type:"choice", q:"The average time to open a page is 2 seconds. What can this number hide?",
       opts:[ {t:"A few users waiting very long", ok:1},
              {t:"The total number of pages", why:"That is a different number. The danger of an average is that it hides the worst cases."},
              {t:"The name of the slowest page", why:"Possibly, but the main danger is that some users wait far longer than the average suggests."} ],
       point:"An average hides the unlucky users.",
       ex:"One foot in ice water, one in boiling water: comfortable on average." },

     { from:"l12-2", type:"choice", q:"A service cannot work without a supplier that works 99% of the time. What follows from that?",
       opts:[ {t:"It cannot do better than 99%", ok:1},
              {t:"It can still reach 99.99%", why:"When the supplier is down, the service is down. It cannot beat what it depends on, unless there is a second supplier."},
              {t:"The supplier does not matter", why:"The supplier sets the upper limit. Every failure there is a failure of the service."} ],
       point:"You are at most as reliable as what you cannot work without.",
       ex:"A chain is as strong as its weakest link." },

     { from:"l13-1", type:"choice", q:"An AI gives a confident answer about the cause of an incident. What should happen before anyone acts on it?",
       opts:[ {t:"The evidence is checked", ok:1},
              {t:"Nothing. Confidence is enough", why:"AI can sound sure and be wrong. Acting on a wrong cause can make things worse."},
              {t:"The AI is switched off", why:"That throws away a useful helper. Check its answer, then use it."} ],
       point:"Sounding sure is not the same as being right.",
       ex:"A navigation app that sends you into a closed road with full confidence." },

     { from:"l13-2", type:"choice", q:"What is the safest way to give an AI agent more freedom?",
       opts:[ {t:"In steps, as it proves itself", ok:1},
              {t:"All at once, to save time", why:"Then its first mistake happens with full power. Freedom should be earned in steps."},
              {t:"Never. AI must only watch", why:"That wastes what a proven agent can do. The point is to earn trust in steps, with limits and a stop button."} ],
       point:"Freedom in steps, with limits, a record and a stop button.",
       ex:"A learner driver gets the motorway after the quiet streets." }
    ]}
 ]}
];

/* Stops that are planned but not written yet. Shown on the home screen while the list is not empty. */
var LATER = [];
