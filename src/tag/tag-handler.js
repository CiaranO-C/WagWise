const {
  retrieveTags,
  getTagByName,
  updateTag,
  deleteDbTag,
  createTag,
} = require("./tag-queries");

async function getAllTags(req, res, next) {
  try {
    const tags = await retrieveTags();
    res.json({ tags });
  } catch (error) {
    next(error);
  }
}

async function getTag(req, res, next) {
  try {
    const tagName = req.params.tagName;
    const tag = await getTagByName(tagName);
    res.json({ tag });
  } catch (error) {
    next(error);
  }
}

async function putTag(req, res, next) {
  try {
    const { tagName } = req.params.tagName;
    const { newName } = req.body;
    const updated = await updateTag(tagName, newName);
    res.json({ updated });
  } catch (error) {
    next(error);
  }
}

async function deleteTag(req, res, next) {
  try {
    const { tagName } = req.params.tagName;
    const deleted = await deleteDbTag(tagName);
    res.json({ deleted });
  } catch (error) {
    next(error);
  }
}

async function postTag(req, res, next) {
  try {
    const { tagName } = req.body;
    const newTag = await createTag(tagName);
    res.json({ newTag });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllTags, getTag, putTag, deleteTag, postTag };
