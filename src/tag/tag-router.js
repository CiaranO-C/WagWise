const { Router } = require('express');
const handler = require('./tag-handler');
const { adminAuth } = require('../user/auth/auth');

const tagRouter = Router();

// base --> "/tags"

/* Public */
tagRouter.get('/', handler.getAllTags);
tagRouter.get("/:tagName", handler.getTag);

/* Admin */
tagRouter.use(adminAuth);
tagRouter.post("/", handler.postTag);
tagRouter.put("/:tagName", handler.putTag);
tagRouter.delete("/:tagName", handler.deleteTag);
tagRouter.get("/admin/all", handler.getAllTags);
tagRouter.get("/admin/:tagName", handler.getTag);
module.exports = tagRouter;