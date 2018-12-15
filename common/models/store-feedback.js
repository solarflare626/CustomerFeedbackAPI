'use strict';
const pd = require('paralleldots');


const apiKeys = [
    'PgeW0beHradoZMFnQrcdOhcDssb9jRySDcIpi8cNzVg',
    'j5pHxCrWjF8r8pXilaO4Rr8PS6RPfFbt4e9fCXhgVlo',
    'cJ0Z1LpMRUs0y32o7tf4xW1EOHEg8YB8icsHD381Cp8'

];

function changeKey(){
    var index = Math.floor(Math.random() * apiKeys.length);
    pd.apiKey = apiKeys[index];
    console.log("apikey is : ",index,apiKeys[index]);
};


module.exports = function(Storefeedback) {
    Storefeedback.observe('before save', function updateTimestamp(ctx, next) {
        if (ctx.instance) {
            changeKey();
            pd.sentiment(ctx.instance.comment,'en')
            .then((response) => {
                response = JSON.parse(response);
                ctx.instance.sentiment = response.sentiment;
                ctx.instance.sentiment_positive = response.probabilities.positive;
                ctx.instance.sentiment_negative = response.probabilities.negative;
                ctx.instance.sentiment_neutral = response.probabilities.neutral;
                next();
            }).catch((error) =>{
                console.log(error);
            })
        } else {
            changeKey();
            pd.sentiment(ctx.data.comment,'en')
            .then((response) => {
                response = JSON.parse(response);
                ctx.data.sentiment = response.sentiment;
                ctx.data.sentiment_positive = response.probabilities.positive;
                ctx.data.sentiment_negative = response.probabilities.negative;
                ctx.data.sentiment_neutral = response.probabilities.neutral;
                next();
            }).catch((error) =>{
                console.log(error);
            })
        }
      });

      Storefeedback.observe('after save', function(ctx, next) {
        if (ctx.instance) {
            console.log('Saved %s#%s', ctx.Model.modelName, ctx.instance.id);
            changeKey();
            pd.phraseExtractor(ctx.instance.comment)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        } else {
          console.log('Updated %s matching %j',
            ctx.Model.pluralModelName,
            ctx.where);
        }
        next();
      });
      
      
    
};
