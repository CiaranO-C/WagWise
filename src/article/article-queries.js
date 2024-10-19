const prisma = require("../../config/prisma");

async function searchArticles(value, user) {
  try {
    //if user is not admin only fetch published articles
    const condition = user?.role === "ADMIN" ? {} : { published: true };
    console.log(condition);

    const articles = prisma.article.findMany({
      where: condition,
      include: {
        author: {
          select: {
            username: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        _relevance: {
          fields: ["title"],
          search: value,
          sort: "desc",
        },
      },
    });

    return articles;
  } catch (error) {
    throw new Error("Error searching databse");
  }
}

async function getArticles(sort, order, limit) {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      include: {
        author: { select: { username: true } },
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { [sort]: order },
      take: limit,
    });

    return articles;
  } catch (error) {
    throw new Error("Error retrieving articles");
  }
}

async function getUnpublished(sort, order, limit) {
  try {
    const articles = await prisma.article.findMany({
      where: { published: false },
      include: { author: { select: { username: true } } },
      orderBy: { [sort]: order },
      take: limit,
    });

    return articles;
  } catch (error) {
    throw new Error("Error retrieving unpublished articles");
  }
}

async function getArticleById(id) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: id },
      include: {
        tags: true,
        likes: true,
        comments: { include: { author: { select: { username: true } } } },
      },
    });

    return article;
  } catch (error) {
    throw new Error(`Error retrieving article: ${id}`);
  }
}

async function createArticle(title, text, tagNames, userId) {
  try {
    console.log(typeof tagNames);

    const article = await prisma.article.create({
      data: {
        title: title,
        body: text,
        tags: {
          connectOrCreate: tagNames.map((tag) => ({
            where: { tagName: tag },
            create: { tagName: tag },
          })),
        },
        authorId: userId,
      },
    });
    return article;
  } catch (error) {
    throw new Error("Error creating article");
  }
}

async function updateArticle(articleId, title, text, tagNames) {
  try {
    const updated = await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        title: title,
        body: text,
        tags: {
          set: tagNames.map((tag) => ({ tagName: tag })),
        },
      },
    });
    return updated;
  } catch (error) {
    throw new Error("Error updating article");
  }
}

async function insertComment(articleId, authorId, text, review) {
  try {
    const newComment = await prisma.comment.create({
      data: { articleId, authorId, text, review },
    });

    return newComment;
  } catch (error) {
    throw new Error("Error inserting comment");
  }
}

async function deleteDbArticle(id) {
  console.log("ID -->", id);

  try {
    const deleted = await prisma.article.delete({
      where: {
        id: id,
      },
    });

    return deleted;
  } catch (error) {
    throw new Error("Error deleting article");
  }
}

async function publishArticle(id) {
  try {
    const published = await prisma.article.update({
      where: {
        id: id,
      },
      data: {
        published: true,
      },
    });

    return published;
  } catch (error) {
    throw new Error("Error publishing article");
  }
}

async function unpublishArticle(id) {
  try {
    const unpublished = await prisma.article.update({
      where: {
        id: id,
      },
      data: {
        published: false,
      },
    });

    return unpublished;
  } catch (error) {
    throw new Error("Error unpublishing article");
  }
}

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  insertComment,
  deleteDbArticle,
  getUnpublished,
  publishArticle,
  unpublishArticle,
  searchArticles,
};
