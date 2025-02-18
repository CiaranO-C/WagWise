const prisma = require("../../config/prisma");

async function retrieveTags(user) {
  try {
    //if user not admin, count only published articles
    const condition = user?.role === "ADMIN" ? {} : { published: true };
    const tags = await prisma.tags.findMany({
      include: {
        _count: {
          select: {
            articles: { where: condition },
          },
        },
      },
      orderBy: {
        articles: {
          _count: "desc",
        },
      },
    });
    return tags;
  } catch (error) {
    throw new Error("Error retrieving tags");
  }
}

async function getTagByName(name, user) {
  try {
    //if user not admin, get only published articles
    const condition = user?.role === "ADMIN" ? {} : { published: true };
    const tag = await prisma.tags.findUnique({
      where: { tagName: name },
      include: {
        articles: {
          where: condition,
          include: {
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
            author: true,
            tags: true,
          },
        },
      },
    });
    return tag;
  } catch (error) {
    throw new Error(`Error retrieving tag: ${name}`);
  }
}

async function updateTag(tagName, newName) {
  try {
    const updated = await prisma.tags.update({
      where: {
        tagName,
      },
      data: {
        tagName: newName,
      },
    });
    return updated;
  } catch (error) {
    throw new Error(`Error updating tag: ${tagName}`);
  }
}

async function deleteDbTag(tagName) {
  try {
    const deleted = prisma.tags.delete({ where: { tagName } });
    return deleted;
  } catch (error) {
    throw new Error(`Error deleting tag: ${tagName}`);
  }
}

async function createTag(tagName) {
  try {
    const newTag = await prisma.tags.create({
      data: {
        tagName: tagName,
      },
    });
    return newTag;
  } catch (error) {    
    throw new Error("Error creating tag");
  }
}

module.exports = {
  retrieveTags,
  getTagByName,
  updateTag,
  deleteDbTag,
  createTag,
};
