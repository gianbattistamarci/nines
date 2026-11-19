/* Nines: course content. Everything the player reads in a lesson or exam lives in this file.
   The game code is in index.html and never needs to change when you add or edit questions.

   HOW A QUESTION IS WRITTEN
   type "choice": q (the question), opts (answers). Mark the right answer with ok:1. Every wrong answer needs a why.
   type "sort":   q, buckets (two or three group names), items. Each item has t (text), b (group number, counting from 0) and why.
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
   2. One way to write numbers: "98 out of 100". Never mix "worked" and "failed" counts or different totals in one question.
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
     Every idea in this lesson has two versions, so a replay is not a repeat. */
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
    ]}
 ]}
];

/* Stops that are planned but not written yet. Shown on the home screen. */
var LATER = [
 {k:"2.2 to 2.4", t:"Why not 100%, the error budget, spend it or save it"},
 {k:"Checkpoint B", t:"Exam on targets and budgets", exam:1},
 {k:"Unit 3", t:"Watching the system: signals, symptoms and causes"},
 {k:"Unit 4", t:"Alarms worth waking up for"},
 {k:"Checkpoint C", t:"Exam on watching and alerting", exam:1},
 {k:"Unit 5", t:"Boring work, and how to get rid of it"},
 {k:"Unit 6", t:"On call without burning out"},
 {k:"Unit 7", t:"When it breaks: running an incident"},
 {k:"Unit 8", t:"Learning without blame"},
 {k:"Checkpoint D", t:"Exam on incidents", exam:1},
 {k:"Unit 9", t:"Changing things safely"},
 {k:"Unit 10", t:"Built to bend, not break"},
 {k:"Unit 11", t:"Teams and trust"},
 {k:"Unit 12", t:"The hard parts"},
 {k:"Unit 13", t:"AI at the controls"},
 {k:"Final exam", t:"Everything, mixed", exam:1}
];
