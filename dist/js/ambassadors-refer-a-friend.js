/*!
 * donut-website v0.0.1
 * A description for your project.
 * (c) 2020 
 * MIT License
 * http://link-to-your-git-repo.com
 */


const milestoneMessage = document.getElementById('milestone-message');

let referralCount;
let milestones;

var campaign;
var campaignLoadInterval = setInterval(() => {
  if (campaign) {
    
    clearInterval(campaignLoadInterval);
    campaign.addHook("stageChange", (function(e) {
      if (e.stage == "postIdentify") {
        
        var intervalToken = setInterval(() => {
          if (campaign.widgetData && campaign.user) {
              
            referralCount = campaign.widgetData.referralCount;

            milestones = campaign.widgetData.widgets.milestoneWidget.milestones;
            

            let referralsNeeded;
            let prize;

            
            for(let i = 0; i < milestones.length; i++) {
              if(referralCount >= milestones[i].referralsNeeded && referralCount < milestones[i+1].referralsNeeded) {
                clearInterval(intervalToken);
                referralsNeeded = milestones[i+1].referralsNeeded - referralCount;
                prize = milestones[i+1].description.text;
                
                updateText(referralsNeeded, prize);
                return;
              } else if (referralCount < milestones[0].referralsNeeded) {
                clearInterval(intervalToken);
                referralsNeeded = milestones[0].referralsNeeded - referralCount;
                prize = milestones[0].description.text;
                updateText(referralsNeeded, prize);
                return;
              }
            }


            function updateText(referralsNeeded, prize) {
              if(referralsNeeded == 1) {
                milestoneMessage.innerHTML = `
                  <h3>You're only <span class="referralsTilNextPrize">${referralsNeeded}</span> referral away from receiving</h3>
                  <h3 class="nextPrize">${prize}</h3>`;
              } else {
                milestoneMessage.innerHTML = `
                  <h3>You're only <span class="referralsTilNextPrize">${referralsNeeded}</span> referrals away from receiving</h3>
                  <h3 class="nextPrize">${prize}</h3>`;
              }
            }
          }
        }, 200);  
      }
    }));
  }
}, 200);