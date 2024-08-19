const {
  RegExpMatcher,
  TextCensor,
  englishDataset,
  englishRecommendedTransformers,
} = require("obscenity");

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

const asteriskStrategy = (ctx) => "*".repeat(ctx.matchLength);
const censor = new TextCensor().setStrategy(asteriskStrategy);

function profanityReplace(text) {
  const matches = matcher.getAllMatches(text);
  console.log(censor.applyTo(text, matches));
}

function profanityCheck(text) {
  if (matcher.hasMatch(text)) {
    return true;
  }
  return false;
}

module.exports = { profanityCheck, profanityReplace };
