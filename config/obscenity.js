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
  const cleanText = censor.applyTo(text, matches);
  return cleanText;
}

function profanityCheck(text) {
  if (matcher.hasMatch(text)) {
    return true;
  }
  return false;
}

module.exports = { profanityCheck, profanityReplace };
